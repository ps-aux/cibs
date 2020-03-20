import { CreateProjectInfoProvider, ProjectInfoProvider } from 'src'
import { createGradleInfoProvider } from 'src/info/gradle/GradleInfoProvider'
import { createNpmInfoProvider } from 'src/info/npm/NpmInfoProvider'
import { GRADLE, NPM, PROJECT_TYPE } from 'src/info/ProjectType'
import { detectProjectType } from 'src/info/detectProjectType'
import { Context } from 'src/ctx/Context'

const projectInfoProviders: {
    [key: string]: CreateProjectInfoProvider
} = {
    [GRADLE]: createGradleInfoProvider,
    [NPM]: createNpmInfoProvider
}

const getProjectType = (cmd: GetProjectInfoCmd, ctx: Context): PROJECT_TYPE => {
    if (cmd.projectType) return cmd.projectType

    const config = ctx.config()
    if (config) return config.projectType
    return detectProjectType(cmd.dir)
}

const getProjectInfoProvider = (
    cmd: GetProjectInfoCmd,
    ctx: Context
): ProjectInfoProvider => {
    const { dir } = cmd

    const projectType = getProjectType(cmd, ctx)
    const res = projectInfoProviders[projectType]

    if (!res) throw new Error(`Unknown project type: ${projectType}`)

    return res(dir, ctx)
}

export type ProjectInfo = {
    name: string
    version: string
}

export type GetProjectInfoCmd = {
    projectType?: PROJECT_TYPE
    dir: string
}

export const getProjectInfo = (
    cmd: GetProjectInfoCmd,
    ctx: Context
): ProjectInfo => {
    const prov = getProjectInfoProvider(cmd, ctx)

    return {
        name: prov.name(),
        version: prov.version()
    }
}
