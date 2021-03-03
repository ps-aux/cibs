import { ArtifactInfoProvider } from './ArtifactInfoProvider'
import { ProjectInfoProvider } from './project/ProjectInfoProvider'
import { FileSystem } from '../fs/FileSystem'
import { GradleProjectDriver } from './project/drivers/gradle/GradleProjectDriver'
import { NpmProjectDriver } from 'src/info/project/drivers/npm/NpmProjectDriver'
import { NpmClient } from './project/drivers/npm/NpmClient'
import { GradleClient } from 'src/info/project/drivers/gradle/GradleClient'
import { BuildInfoProvider } from './build/BuildInfoProvider'
import { Container } from 'inversify'
import { ProjectDriver } from './project/ProjectDriver'
import { InfoCmdHandler } from './InfoCmdHandler'

export const addInfoContext = (
    c: Container,
    dir: string,
    projectType: string | null
): void => {
    const self: any[] = [
        NpmClient,
        GradleClient,
        BuildInfoProvider,
        GradleProjectDriver,
        NpmProjectDriver,
        InfoCmdHandler
    ]

    self.forEach(s => c.bind(s).toSelf())

    c.bind(ProjectInfoProvider).toDynamicValue(ctx => {
        const providers: ProjectDriver[] = [
            ctx.container.get(GradleProjectDriver),
            ctx.container.get(NpmProjectDriver)
        ]
        const fs = ctx.container.get(FileSystem)
        return new ProjectInfoProvider(providers, dir, fs)
    })
    c.bind(ArtifactInfoProvider).toDynamicValue(ctx => {
        return new ArtifactInfoProvider(
            ctx.container.get(BuildInfoProvider),
            ctx.container.get(ProjectInfoProvider),
            projectType
        )
    })
}
