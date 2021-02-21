import 'reflect-metadata'
import { addInfoContext } from 'src/info/InfoContext'
import { DockerImageBuilder } from 'src/docker/DockerImageBuilder'
import { EnvConfProvider } from 'src/util/env/EnvConfProvider'
import { FileSystem } from 'src/fs/FileSystem'
import { Git } from 'src/util/git/Git'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { Clock } from 'src/ctx/Clock'
import { DockerClient } from 'src/docker/DockerClient'
import { Container } from 'inversify'
import { ConfProvider_, Log_ } from './ids'
import { ArtifactInfoProvider } from '../info/ArtifactInfoProvider'
import { minimalLogger } from '../log/MinimalLogger'

export type AppContext = {
    info: ArtifactInfoProvider
    docker: DockerImageBuilder
}

export const createAppContext = (
    dir: string,
    projectType: string | null
): [AppContext, Container] => {
    const self: any[] = [FileSystem, LocalShellCmdExecutor, Git, Clock]
    const c = new Container()

    const env = new EnvConfProvider()
    // const log = new ConsoleLogger()
    const log = minimalLogger()

    c.bind(Log_).toConstantValue(log)
    c.bind(ConfProvider_).toConstantValue(env)

    self.forEach(s => c.bind(s).toSelf())

    addInfoContext(c, dir, projectType)

    c.bind(DockerClient).toSelf()
    c.bind(DockerImageBuilder).toSelf()

    return [
        {
            info: c.get(ArtifactInfoProvider),
            docker: c.get(DockerImageBuilder)
        },
        c
    ]
}
