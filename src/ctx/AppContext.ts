import 'reflect-metadata'
import { addInfoContext } from '../info/InfoContext'
import { DockerImageBuilder } from '../docker/DockerImageBuilder'
import { EnvConfProvider } from '../util/env/EnvConfProvider'
import { FileSystem } from '../fs/FileSystem'
import { Git } from '../util/git/Git'
import { LocalShellCmdExecutor } from '../util/shell/LocalShellCmdExecutor'
import { Clock } from './Clock'
import { DockerClient } from '../docker/DockerClient'
import { Container } from 'inversify'
import { ConfProvider_, Log_ } from './ids'
import { minimalLogger } from '../log/MinimalLogger'
import { InfoCmdHandler } from '../info/InfoCmdHandler'
import { DockerCmdHandler } from '../docker/DockerCmdHandler'
import { Config_ } from './Config'

export type Handlers = {
    info: InfoCmdHandler
    docker: DockerCmdHandler
}

export const createAppContext = (
    dir: string,
    projectType: string | null
): [Handlers, Container] => {
    const self: any[] = [FileSystem, LocalShellCmdExecutor, Git, Clock]
    const c = new Container()

    const env = new EnvConfProvider()
    // const log = new ConsoleLogger()
    const log = minimalLogger()

    c.bind(Log_).toConstantValue(log)
    c.bind(ConfProvider_).toConstantValue(env)
    c.bind(Config_).toConstantValue({
        dir
    })

    self.forEach(s => c.bind(s).toSelf())

    addInfoContext(c, dir, projectType)

    // Docker
    c.bind(DockerClient).toSelf()
    c.bind(DockerImageBuilder).toSelf()
    c.bind(DockerCmdHandler).toSelf()

    return [
        {
            info: c.get(InfoCmdHandler),
            docker: c.get(DockerCmdHandler)
        },
        c
    ]
}
