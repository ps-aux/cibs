import { ProjectInfoProvider } from 'src/info/project/ProjectInfoProvider'
import { BuildInfoProvider } from 'src/info/build/BuildInfoProvider'
import { ProjectInfo } from 'src/info/project/ProjectInfo'
import { BuildInfo } from 'src/info/build/BuildInfo'
import { ArtifactInfo } from 'src/info/ArtifactInfo'

const calculateVersion = (proj: ProjectInfo, build: BuildInfo): string =>
    proj.version + '-' + build.buildNumber

export class ArtifactInfoProvider {
    constructor(
        private buildInfoProvider: BuildInfoProvider,
        private projectInfoProvider: ProjectInfoProvider,
        private projectType: string | null
    ) {}

    provide = (): ArtifactInfo => {
        const proj = this.projectInfoProvider.provide(this.projectType)
        const build = this.buildInfoProvider.provide()

        const { commit, buildNumber, buildTime, commitMessage } = build
        return {
            name: proj.name,
            version: calculateVersion(proj, build),
            commit,
            commitMessage,
            buildTime,
            buildNumber
        }
    }
}
