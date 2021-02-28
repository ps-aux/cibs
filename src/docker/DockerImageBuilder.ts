import { ArtifactInfoProvider } from 'src/info/ArtifactInfoProvider'
import { ConfProvider, Log } from 'src/types'
import { DockerClient } from 'src/docker/DockerClient'
import { inject, injectable } from 'inversify'
import { ConfProvider_, Log_ } from '../ctx/ids'

type DockerProps = {
    registryName: string
    apiUrl: string
    username: string
    password: string
}

export const DOCKER_ENV_VARS = {
    registryName: 'DOCKER_REGISTRY_NAME',
    apiUrl: 'DOCKER_REGISTRY_API_URL',
    username: 'DOCKER_REGISTRY_LOGIN_USERNAME',
    password: 'DOCKER_REGISTRY_LOGIN_PASSWORD'
}

const BUILD_INFO_VAR = 'BUILD_INFO'

@injectable()
export class DockerImageBuilder {
    constructor(
        private artifactInfoProvider: ArtifactInfoProvider,
        @inject(ConfProvider_) private env: ConfProvider,
        private docker: DockerClient,
        @inject(Log_) private log: Log
    ) {}

    private getProps = (): DockerProps => {
        return {
            registryName: this.env.property(DOCKER_ENV_VARS.registryName),
            apiUrl: this.env.property(DOCKER_ENV_VARS.apiUrl),
            username: this.env.property(DOCKER_ENV_VARS.username),
            password: this.env.property(DOCKER_ENV_VARS.password)
        }
    }

    buildAndPublish = (dir: string, addBuildInfo?: boolean): void => {
        this.log.debug('Building Docker image from dir', dir)
        const info = this.artifactInfoProvider.provide()
        const props = this.getProps()

        const imageName = this.docker.composeName(props.registryName, info.name)

        this.docker.loginToRegistry(
            props.apiUrl,
            props.username,
            props.password
        )
        const buildArgs: Record<string, string> = {}

        if (addBuildInfo) buildArgs[BUILD_INFO_VAR] = JSON.stringify(info)

        this.docker.build(dir, imageName, info.version, buildArgs)
        this.docker.push(imageName)
    }
}
