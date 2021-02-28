import { ProjectInfoProvider } from './project/ProjectInfoProvider'
import { BuildInfoProvider } from './build/BuildInfoProvider'
import { ProjectInfo } from './project/ProjectInfo'
import { BuildInfo } from './build/BuildInfo'
import { ArtifactInfo } from 'src/info/ArtifactInfo'
import { injectable } from 'inversify'

const calculateVersion = (proj: ProjectInfo, build: BuildInfo): string =>
    proj.version + '-' + build.buildNumber

@injectable()
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
