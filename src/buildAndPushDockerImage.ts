import { Context } from 'src/ctx/Context'
import { getProjectInfoProvider } from 'src/info/getProjectInfoProvider'
import { DockerImageClient } from 'src/docker/DockerImageClient'

export const buildAndPushDockerImage = (
    dockerDir: string,
    projectDir: string,
    projectType: string | null,
    ctx: Context
) => {
    const log = ctx.log()
    log.debug('Building Docker image', dockerDir, projectDir)

    const env = ctx.env()
    const version = env.property('VERSION')

    const registryName = env.property('DOCKER_REGISTRY_NAME')
    const apiUrl = env.property('DOCKER_REGISTRY_API_URL')

    const username = env.property('DOCKER_REGISTRY_LOGIN_USERNAME')
    const password = env.property('DOCKER_REGISTRY_LOGIN_PASSWORD')

    const projInfo = getProjectInfoProvider(projectType, projectDir)

    const docker = new DockerImageClient(
        apiUrl,
        registryName,
        projInfo.name(),
        log
    )

    docker.loginToRegistry(username, password)
    docker.build(dockerDir, version)
    docker.push()
}
