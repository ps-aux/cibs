import { ArtefactInfo } from 'src/artefact-info/ArtefactInfo'
import { ProjectInfoProvider } from 'src/artefact-info/project/ProjectInfoProvider'
import { BuildInfoProvider } from 'src/artefact-info/build/BuildInfoProvider'
import { ProjectInfo } from 'src/artefact-info/project/ProjectInfo'
import { BuildInfo } from 'src/artefact-info/build/BuildInfo'

const calculateVersion = (proj: ProjectInfo, build: BuildInfo): string =>
    proj.version + '-' + build.buildNumber

export class ArtefactInfoProvider {
    constructor(
        private buildInfoProvider: BuildInfoProvider,
        private projectInfoProvider: ProjectInfoProvider
    ) {}

    provide = (): ArtefactInfo => {
        const proj = this.projectInfoProvider.provider()
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
