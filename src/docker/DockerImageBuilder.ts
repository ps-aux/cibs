import { ArtifactInfoProvider } from 'src/info/ArtifactInfoProvider'
import { ConfProvider, Log } from 'src'
import { DockerClient } from 'src/docker/DockerClient'

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
    password: 'DOCKER_REGISTRY_LOGIN_USERNAME'
}

const BUILD_INFO_VAR = 'BUILD_INFO'

export class DockerImageBuilder {
    constructor(
        private artifactInfoProvider: ArtifactInfoProvider,
        private env: ConfProvider,
        private docker: DockerClient,
        private log: Log
    ) {}

    private getProps = (): DockerProps => {
        return {
            registryName: this.env.property(DOCKER_ENV_VARS.registryName),
            apiUrl: this.env.property(DOCKER_ENV_VARS.apiUrl),
            username: this.env.property(DOCKER_ENV_VARS.username),
            password: this.env.property(DOCKER_ENV_VARS.password)
        }
    }

    buildAndPublish = (dir: string, addBuildInfo?: boolean) => {
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
