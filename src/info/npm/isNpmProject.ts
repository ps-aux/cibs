import { ProjectMatcher } from 'src'

export const isNpmProject: ProjectMatcher = files => {
    for (const f of files) {
        if (f === 'package.json') return true
    }

    return false
}
