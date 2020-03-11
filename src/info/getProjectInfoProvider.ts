import { CreateProjectInfoProvider, ProjectInfoProvider } from 'src'
import { createGradleInfoProvider } from 'src/info/gradle/GradleInfoProvider'
import { createNpmInfoProvider } from 'src/info/npm/NpmInfoProvider'
import { GRADLE, NPM } from 'src/info/ProjectType'
import Path from 'path'
import { detectProjectType } from 'src/info/detectProjectType'

const projectInfoProviders: {
    [key: string]: CreateProjectInfoProvider
} = {
    [GRADLE]: createGradleInfoProvider,
    [NPM]: createNpmInfoProvider
}

const getDir = (providedDir: string | null, cwd: string) => {
    return providedDir ? Path.resolve(cwd, providedDir) : cwd
}

export const getProjectInfoProvider = (
    projectType: string | null,
    dir: string | null
): ProjectInfoProvider => {
    const projectDir = getDir(dir, process.cwd())
    if (!projectType) projectType = detectProjectType(projectDir)

    const res = projectInfoProviders[projectType]

    if (!res) throw new Error(`Unknown project type: ${projectType}`)

    return res(projectDir)
}
