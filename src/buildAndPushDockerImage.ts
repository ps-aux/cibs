import { Context } from 'src/ctx/Context'
import { GetProjectInfoCmd } from 'src/info/getProjectInfo'
import { DockerImageClient } from 'src/docker/DockerImageClient'
import { getBuildInfo } from 'src/info/getBuildInfo'

export const buildAndPushDockerImage = (
    projInfoCmd: GetProjectInfoCmd,
    dockerDir: string,
    ctx: Context
) => {
    const log = ctx.log()
    const info = getBuildInfo(projInfoCmd, ctx)

    log.debug('Building Docker image', dockerDir)

    const env = ctx.env()
    const version = info.version
    const name = info.name

    const registryName = env.property('DOCKER_REGISTRY_NAME')
    const apiUrl = env.property('DOCKER_REGISTRY_API_URL')

    const username = env.property('DOCKER_REGISTRY_LOGIN_USERNAME')
    const password = env.property('DOCKER_REGISTRY_LOGIN_PASSWORD')

    const docker = new DockerImageClient(
        apiUrl,
        registryName,
        name,
        ctx.shell(),
        log
    )

    docker.loginToRegistry(username, password)
    docker.build(dockerDir, version)
    docker.push()
}
