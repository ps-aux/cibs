import { ArtifactInfoProvider } from 'src/info/ArtifactInfoProvider'
import { ProjectInfoProvider } from 'src/info/project/ProjectInfoProvider'
import { FileSystem } from 'src/fs/FileSystem'
import { GradleProjectDriver } from 'src/info/project/drivers/gradle/GradleProjectDriver'
import { NpmProjectDriver } from 'src/info/project/drivers/npm/NpmProjectDriver'
import { NpmClient } from 'src/info/project/drivers/npm/NpmClient'
import { GradleClient } from 'src/info/project/drivers/gradle/GradleClient'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { BuildInfoProvider } from 'src/info/build/BuildInfoProvider'
import { ConfProvider } from 'src'
import { Git } from 'src/util/git/Git'
import { Clock } from 'src/ctx/Clock'
import { Container } from 'inversify'
import { ProjectDriver } from './project/ProjectDriver'

export type InfoContext = {
    artefactInfoProvider: ArtifactInfoProvider
}

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
        NpmProjectDriver
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

export const createInfoContext = (
    dir: string,
    fs: FileSystem,
    sh: LocalShellCmdExecutor,
    env: ConfProvider,
    git: Git,
    clock: Clock,
    type: string | null
): InfoContext => {
    const npm = new NpmClient()
    const gradle = new GradleClient(fs, sh)

    const projectInfoProvider = new ProjectInfoProvider(
        [new GradleProjectDriver(gradle), new NpmProjectDriver(npm)],
        dir,
        fs
    )

    const buildInfoProvider = new BuildInfoProvider(env, git, clock)

    return {
        artefactInfoProvider: new ArtifactInfoProvider(
            buildInfoProvider,
            projectInfoProvider,
            type
        )
    }
}
