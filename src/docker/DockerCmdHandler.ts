import { inject, injectable } from 'inversify'
import { DockerImageBuilder } from './DockerImageBuilder'
import { Config, Config_ } from '../ctx/Config'
import { normalizeDir } from '../util/normalizeDir'

export type BuildAndPushOptions = {
    dockerDir: string | null
    buildInfoBuildArg: boolean | null
}

@injectable()
export class DockerCmdHandler {
    constructor(
        private imgBuilder: DockerImageBuilder,
        @inject(Config_) private conf: Config
    ) {}

    buildAndPush = (cmd: BuildAndPushOptions): void => {
        const cliArgDir = cmd.dockerDir && normalizeDir(cmd.dockerDir)
        this.imgBuilder.buildAndPublish(
            cliArgDir || this.conf.dir,
            !!cmd.buildInfoBuildArg
        )
    }
}
