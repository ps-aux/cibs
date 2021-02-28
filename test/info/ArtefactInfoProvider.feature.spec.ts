import 'reflect-metadata'
import { ArtifactInfoProvider } from 'src/info/ArtifactInfoProvider'
import { BUILD_NO_ENV_VAR_NAME } from 'src/info/build/BuildInfoProvider'
import td from 'testdouble'
import { Clock } from 'src/ctx/Clock'
import { Git } from 'src/util/git/Git'
import { minimalLogger } from 'src/log/MinimalLogger'
import { ConfProvider_, Log_ } from '../../src/ctx/ids'
import { createAppContext } from '../../src/ctx/AppContext'
import { ConfProvider } from '../../src/types'
import { dataDirPath } from '../_data/dataDirPath'
import { Process } from '@ps-aux/nclif'

const sut = (dir: string, projectType: string | null): ArtifactInfoProvider => {
    const env = td.object<ConfProvider>()
    td.when(env.property(BUILD_NO_ENV_VAR_NAME)).thenReturn('build-no')

    const clock = td.object<Clock>()
    td.when(clock.now()).thenReturn(new Date('2020-01-01 12:00'))

    const git = td.object<Git>()
    td.when(git.commitMessage()).thenReturn('My commit')
    td.when(git.commitId()).thenReturn('abcd')

    const c = createAppContext(
        {
            dir,
            projectType
        },
        {
            cwd: 'ee'
        } as Process
    )

    c.rebind(Log_).toConstantValue(minimalLogger())
    c.rebind(Git).toConstantValue(git)
    c.rebind(Clock).toConstantValue(clock)
    c.rebind(ConfProvider_).toConstantValue(env)

    return c.get(ArtifactInfoProvider)
}

const test = (
    name: string,
    path: string[],
    expectedName: string,
    expectedVersion: string,
    type?: string
) =>
    it(name, () => {
        const res = sut(dataDirPath('project', ...path), type || null).provide()

        expect(res).toEqual({
            name: expectedName,
            version: expectedVersion + '-build-no',
            commit: 'abcd',
            commitMessage: 'My commit',
            buildTime: '2020-01-01T11:00:00.000Z',
            buildNumber: 'build-no'
        })
    })

describe('ProjectDriver', () => {
    test('Gradle only', ['gradle', 'proj1'], 'gradle-proj-1', '1.2.3')
    test('Npm only', ['npm', 'proj1'], 'npm-proj', '4.5.6')

    it('mixed project without explicit type throw error', () => {
        expect(() => {
            sut(dataDirPath('project', 'mixed'), null).provide()
        }).toThrowError(/Multiple project types detected in dir/)
    })
    test('Gradle in mixed', ['mixed'], 'gradle-proj-2', '1.2.3', 'gradle')
    test('Npm in mixed', ['mixed'], 'npm-proj-2', '4.5.6', 'npm')
})
