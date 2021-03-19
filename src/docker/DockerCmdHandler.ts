import { inject, injectable } from 'inversify'
import { DockerImageBuilder } from './DockerImageBuilder'
import { Config, Config_ } from '../ctx/Config'

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
        this.imgBuilder.buildAndPublish(
            cmd.dockerDir || this.conf.dir,
            !!cmd.buildInfoBuildArg
        )
    }
}
