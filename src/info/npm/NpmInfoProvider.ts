import { CreateProjectInfoProvider } from 'src'

export const createNpmInfoProvider: CreateProjectInfoProvider = dir => {
    const infoProvider = createNpmInfoProvider(dir)

    return {
        version: () => infoProvider.version(),
        name: () => infoProvider.name()
    }
}
