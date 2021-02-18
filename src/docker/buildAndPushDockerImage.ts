import { Context } from 'src/ctx/Context'
import { DockerClient } from 'src/docker/DockerClient'
import { Config } from 'src/config/Config'
import { normalizeDir } from 'src/cli/normalizeDir'
import { ArtifactInfoProvider } from 'src/info/ArtifactInfoProvider'

export type BuildAndPushDockerImageCmd = {
    dockerDir?: string
    buildInfoBuildArg: boolean
}

const getDockerDir = (
    cmd: BuildAndPushDockerImageCmd,
    dir: string,
    cfg: Config | null
) => normalizeDir(cmd.dockerDir || cfg?.dockerDir || dir)

export const buildAndPushDockerImage = (
    artefactInfoProvider: ArtifactInfoProvider,
    cmd: BuildAndPushDockerImageCmd,
    ctx: Context
) => {
    const log = ctx.log()

    const dir = getDockerDir(cmd, projInfoCmd, ctx.config())
    const info = artefactInfoProvider.provide()

    log.debug('Building Docker image from dir', dir)

    const env = ctx.env()
    const version = info.version
    const name = info.name

    const registryName = env.property('DOCKER_REGISTRY_NAME')
    const apiUrl = env.property('DOCKER_REGISTRY_API_URL')

    const username = env.property('DOCKER_REGISTRY_LOGIN_USERNAME')
    const password = env.property('DOCKER_REGISTRY_LOGIN_PASSWORD')

    const docker = new DockerClient(apiUrl, ctx.shell(), log)

    docker.loginToRegistry(username, password)
    const buildArgs: { [key: string]: string } = {}

    if (cmd.buildInfoBuildArg) buildArgs.BUILD_INFO = JSON.stringify(info)
    docker.build(dir, version, buildArgs)
    docker.push()
}
