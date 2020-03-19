import { CreateProjectInfoProvider } from 'src'
import { GradleClient } from 'src/info/gradle/GradleClient'

export const createGradleInfoProvider: CreateProjectInfoProvider = (
    dir,
    ctx
) => {
    const gradle = new GradleClient(dir, ctx.shell())
    return {
        version: () => gradle.getVersion(),
        name: () => gradle.getName()
    }
}
