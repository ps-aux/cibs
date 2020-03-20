import { Context } from 'src/ctx/Context'
import { GetProjectInfoCmd } from 'src/info/getProjectInfo'
import { DockerImageClient } from 'src/docker/DockerImageClient'
import { getBuildInfo } from 'src/info/getBuildInfo'

export type BuildAndPushDockerImageCmd = {
    dockerDir: string
    buildInfoBuildArg: boolean
}

export const buildAndPushDockerImage = (
    projInfoCmd: GetProjectInfoCmd,
    cmd: BuildAndPushDockerImageCmd,
    ctx: Context
) => {
    const log = ctx.log()
    const info = getBuildInfo(projInfoCmd, ctx)

    log.debug('Building Docker image', cmd.dockerDir)

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
    const buildArgs: { [key: string]: string } = {}

    if (cmd.buildInfoBuildArg) buildArgs.BUILD_INFO = JSON.stringify(info)
    docker.build(cmd.dockerDir, version, buildArgs)
    docker.push()
}
