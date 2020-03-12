import { CreateProjectInfoProvider, ProjectInfoProvider } from 'src'
import { createGradleInfoProvider } from 'src/info/gradle/GradleInfoProvider'
import { createNpmInfoProvider } from 'src/info/npm/NpmInfoProvider'
import { GRADLE, NPM } from 'src/info/ProjectType'
import { detectProjectType } from 'src/info/detectProjectType'

const projectInfoProviders: {
    [key: string]: CreateProjectInfoProvider
} = {
    [GRADLE]: createGradleInfoProvider,
    [NPM]: createNpmInfoProvider
}

export const getProjectInfoProvider = (
    projectType: string | null,
    dir: string
): ProjectInfoProvider => {
    if (!projectType) projectType = detectProjectType(dir)

    const res = projectInfoProviders[projectType]

    if (!res) throw new Error(`Unknown project type: ${projectType}`)

    return res(dir)
}
