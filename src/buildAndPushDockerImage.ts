import { Context } from 'src/ctx/Context'
import { getProjectInfoProvider } from 'src/info/getProjectInfoProvider'
import { DockerImageClient } from 'src/docker/DockerImageClient'

export const buildAndPushDockerImage = (
    dockerDir: string,
    projectDir: string,
    ctx: Context
) => {
    const log = ctx.log()

    log.debug('Going FOO', dockerDir, projectDir)

    const env = ctx.env()
    const registryName = env.property('DOCKER_REGISTRY_NAME')
    const version = env.property('VERSION')
    const username = env.property('DOCKER_REGISTRY_LOGIN_USERNAME')
    const password = env.property('DOCKER_REGISTRY_LOGIN_PASSWORD')

    const projInfo = getProjectInfoProvider(null, projectDir)

    const docker = new DockerImageClient(registryName, projInfo.name(), log)

    docker.loginToRegistry(username, password)
    docker.build(dockerDir, version)
    docker.push()
}
