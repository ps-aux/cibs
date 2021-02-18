import { ProjectDriver } from 'src/artefact-info/project/ProjectDriver'
import { GradleClient } from 'src/artefact-info/project/drivers/gradle/GradleClient'
import { ProjectInfo } from 'src/artefact-info/project/ProjectInfo'

export class GradleProjectDriver implements ProjectDriver {
    constructor(private gradle: GradleClient) {}

    canDrive = (fileNames: string[]): boolean =>
        this.gradle.isGradleProject(fileNames)

    getInfo(): ProjectInfo {
        return {
            name: this.gradle.getName(),
            version: this.gradle.getVersion()
        }
    }
}
