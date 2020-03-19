import { CreateProjectInfoProvider, ProjectInfoProvider } from 'src'
import { createGradleInfoProvider } from 'src/info/gradle/GradleInfoProvider'
import { createNpmInfoProvider } from 'src/info/npm/NpmInfoProvider'
import { GRADLE, NPM } from 'src/info/ProjectType'
import { detectProjectType } from 'src/info/detectProjectType'
import { Context } from 'src/ctx/Context'

const projectInfoProviders: {
    [key: string]: CreateProjectInfoProvider
} = {
    [GRADLE]: createGradleInfoProvider,
    [NPM]: createNpmInfoProvider
}

const getProjectInfoProvider = (
    cmd: GetProjectInfoCmd,
    ctx: Context
): ProjectInfoProvider => {
    const { dir } = cmd
    const projectType = cmd.projectType || detectProjectType(cmd.dir)

    const res = projectInfoProviders[projectType]

    if (!res) throw new Error(`Unknown project type: ${projectType}`)

    return res(dir, ctx)
}

export type ProjectInfo = {
    name: string
    version: string
}

export type GetProjectInfoCmd = {
    projectType?: string
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
