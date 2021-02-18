import Path from 'path'
import { ArtifactInfoProvider } from 'src/info/ArtifactInfoProvider'
import { FileSystem } from 'src/fs/FileSystem'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { ConfProvider } from 'src'
import { BUILD_NO_ENV_VAR_NAME } from 'src/info/build/BuildInfoProvider'
import td from 'testdouble'
import { Clock } from 'src/ctx/Clock'
import { Git } from 'src/util/git/Git'
import { minimalLogger } from 'src/log/MinimalLogger'
import { createInfoContext } from 'src/info/InfoContext'

const sut = (dir: string, type: string | null): ArtifactInfoProvider => {
    const env = td.object<ConfProvider>()
    td.when(env.property(BUILD_NO_ENV_VAR_NAME)).thenReturn('build-no')

    const clock = td.object<Clock>()
    td.when(clock.now()).thenReturn(new Date('2020-01-01 12:00'))

    const git = td.object<Git>()
    td.when(git.commitMessage()).thenReturn('My commit')
    td.when(git.commitId()).thenReturn('abcd')

    return createInfoContext(
        dir,
        new FileSystem(),
        new LocalShellCmdExecutor(minimalLogger()),
        env,
        git,
        clock,
        type
    ).artefactInfoProvider
}

const test = (
    name: string,
    path: string[],
    expectedName: string,
    expectedVersion: string,
    type?: string
) =>
    it(name, () => {
        const res = sut(
            Path.resolve(__dirname, 'project', ...path),
            type || null
        ).provide()

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
            sut(Path.resolve(__dirname, 'project', 'mixed'), null).provide()
        }).toThrowError(/Multiple project types detected in dir/)
    })
    test('Gradle in mixed', ['mixed'], 'gradle-proj-2', '1.2.3', 'gradle')
    test('Npm in mixed', ['mixed'], 'npm-proj-2', '4.5.6', 'npm')
})
