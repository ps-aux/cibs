import { CreateProjectInfoProvider } from 'src'

export const createNpmInfoProvider: CreateProjectInfoProvider = rootDir => {
    return {
        version: () => 'npm-version',
        name: () => 'name-name'
    }
}
