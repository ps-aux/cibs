import { ArtefactInfoProvider } from 'src/artefact-info/ArtefactInfoProvider'
import { ProjectInfoProvider } from 'src/artefact-info/project/ProjectInfoProvider'
import { FileSystem } from 'src/fs/FileSystem'
import { GradleProjectDriver } from 'src/artefact-info/project/drivers/gradle/GradleProjectDriver'
import { NpmProjectDriver } from 'src/artefact-info/project/drivers/npm/NpmProjectDriver'
import { NpmClient } from 'src/artefact-info/project/drivers/npm/NpmClient'
import { GradleClient } from 'src/artefact-info/project/drivers/gradle/GradleClient'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { BuildInfoProvider } from 'src/artefact-info/build/BuildInfoProvider'
import { ConfProvider } from 'src'
import { Git } from 'src/util/git/Git'
import { Clock } from 'src/ctx/Clock'

export type ArtefactInfoCtx = {
    artefactInfoProvider: ArtefactInfoProvider
}

export const createArtefactInfoCtx = (
    dir: string,
    fs: FileSystem,
    sh: LocalShellCmdExecutor,
    env: ConfProvider,
    git: Git,
    clock: Clock
): ArtefactInfoCtx => {
    const npm = new NpmClient(dir)
    const gradle = new GradleClient(dir, sh)

    const projectInfoProvider = new ProjectInfoProvider(
        [new GradleProjectDriver(gradle), new NpmProjectDriver(npm)],
        dir,
        fs
    )

    const buildInfoProvider = new BuildInfoProvider(env, git, clock)

    return {
        artefactInfoProvider: new ArtefactInfoProvider(
            buildInfoProvider,
            projectInfoProvider
        )
    }
}
