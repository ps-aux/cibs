import { CreateProjectInfoProvider } from 'src'
import { createNpmClient } from 'src/info/npm/NpmClient'

export const createNpmInfoProvider: CreateProjectInfoProvider = dir => {
    const infoProvider = createNpmClient(dir)

    return {
        version: () => infoProvider.getVersion(),
        name: () => infoProvider.getName()
    }
}
