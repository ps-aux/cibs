import Path from 'path'
import { ArtefactInfoProvider } from 'src/artefact-info/ArtefactInfoProvider'
import { createArtefactInfoCtx } from 'src/artefact-info/ctx/ArtefactInfoCtx'
import { FileSystem } from 'src/fs/FileSystem'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { ConfProvider } from 'src'
import { BUILD_NO_ENV_VAR_NAME } from 'src/artefact-info/build/BuildInfoProvider'
import td from 'testdouble'
import { Clock } from 'src/ctx/Clock'
import { Git } from 'src/util/git/Git'

const sut = (dir: string): ArtefactInfoProvider => {
    const env = td.object<ConfProvider>()
    td.when(env.property(BUILD_NO_ENV_VAR_NAME)).thenReturn('build-no')

    const clock = td.object<Clock>()
    td.when(clock.now()).thenReturn(new Date('2020-01-01 12:00'))

    const git = td.object<Git>()
    // td.when(clock.now()).thenReturn(new Date('2020-01-01 12:00'))

    return createArtefactInfoCtx(
        dir,
        new FileSystem(),
        new LocalShellCmdExecutor(),
        env,
        git,
        clock
    ).artefactInfoProvider
}

describe('ProjectDriver', () => {
    it('gradle', () => {
        const res = sut(Path.resolve(__dirname, 'gradle', 'proj1')).provide()

        console.log(res)
        // expect(res).toBe('gradle')
    })
    //
    // it('npm', () => {
    //     const res = detectProjectType(Path.resolve(__dirname, 'npm', 'proj1'))
    //     expect(res).toBe('npm')
    // })
})
