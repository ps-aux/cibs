import { Context } from 'src/ctx/Context'
import { getProjectInfo, GetProjectInfoCmd } from 'src/info/getProjectInfo'

export type BuildInfo = {
    name: string
    version: string
    commit: string
    commitMessage: string
    buildTime: string
}

export const getBuildInfo = (
    cmd: GetProjectInfoCmd,
    ctx: Context
): BuildInfo => {
    const git = ctx.git()
    const env = ctx.env()

    const projectInfo = getProjectInfo(cmd, ctx)

    const buildNo = env.property('BUILD_NO')

    const version = projectInfo.version + '-' + buildNo

    return {
        name: projectInfo.name,
        version,
        commit: git.commitId(),
        commitMessage: git.commitMessage(),
        buildTime: ctx.now().toString()
    }
}
