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
import { DockerCmdHandler } from '../docker/DockerCmdHandler'
import { Config_ } from './Config'
import Path from 'path'
import { Process } from '@ps-aux/nclif'

export type GlobalOptions = {
    dir: string | null
    projectType: string | null
}

export const createAppContext = (
    opts: GlobalOptions,
    proc: Process
): Container => {
    let dir = proc.cwd
    if (opts.dir) {
        if (!Path.isAbsolute(opts.dir)) dir = Path.resolve(proc.cwd, opts.dir)
        else {
            dir = opts.dir
        }
    }
    const projectType = opts.projectType

    const self: any[] = [FileSystem, LocalShellCmdExecutor, Git, Clock]
    const c = new Container()

    const env = new EnvConfProvider(proc.env)
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

    return c
}
