import { CreateProjectInfoProvider } from 'src'
import { createGradleClient } from 'src/info/gradle/GradleClient'

export const createGradleInfoProvider: CreateProjectInfoProvider = dir => {
    const gradle = createGradleClient(dir)
    return {
        version: () => gradle.getVersion(),
        name: () => gradle.getName()
    }
}
