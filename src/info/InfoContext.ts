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

export type InfoContext = {
    artefactInfoProvider: ArtifactInfoProvider
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
