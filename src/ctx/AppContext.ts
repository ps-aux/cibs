import { createInfoContext, InfoContext } from 'src/info/InfoContext'
import { DockerImageBuilder } from 'src/docker/DockerImageBuilder'
import { EnvConfProvider } from 'src/util/env/EnvConfProvider'
import { FileSystem } from 'src/fs/FileSystem'
import { Git } from 'src/util/git/Git'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { Clock } from 'src/ctx/Clock'
import { DockerClient } from 'src/docker/DockerClient'
import { ConsoleLogger } from 'src/log/ConsoleLogger'

export type AppContext = {
    info: InfoContext
    dockerImageBuilder: DockerImageBuilder
}

export const createAppContext = (projectType: string | null): AppContext => {
    const env = new EnvConfProvider()
    const dir = 'ss'

    const log = new ConsoleLogger()
    const fs = new FileSystem()
    const sh = new LocalShellCmdExecutor(log)
    const git = new Git(sh)
    const clock = new Clock()

    const info = createInfoContext(dir, fs, sh, env, git, clock, projectType)

    const docker = new DockerClient(sh, log)
    return {
        info,
        dockerImageBuilder: new DockerImageBuilder(
            info.artefactInfoProvider,
            env,
            docker,
            log
        )
    }
}
