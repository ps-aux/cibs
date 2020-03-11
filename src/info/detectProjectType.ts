import { GRADLE, NPM, PROJECT_TYPE } from 'src/info/ProjectType'
import { isGradleProject } from 'src/info/gradle/isGradleProject'
import { isNpmProject } from 'src/info/npm/isNpmProject'
import { listDirFiles } from 'src/util/fs/listDirFiles'
import { ProjectMatcher } from 'src'

const matchers: { type: PROJECT_TYPE; matches: ProjectMatcher }[] = [
    {
        type: GRADLE,
        matches: isGradleProject
    },
    {
        type: NPM,
        matches: isNpmProject
    }
]

export const detectProjectType = (dir: string): PROJECT_TYPE => {
    const files = listDirFiles(dir)
    for (const m of matchers) {
        if (m.matches(files)) return m.type
    }

    throw new Error(`Could not determine the type of project from dir ${dir}`)
}
