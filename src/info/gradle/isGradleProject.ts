import { ProjectMatcher } from 'src'

export const isGradleProject: ProjectMatcher = files => {
    for (const f of files) {
        if (f === 'build.gradle' || f === 'build.gradle.kts') return true
    }

    return false
}
