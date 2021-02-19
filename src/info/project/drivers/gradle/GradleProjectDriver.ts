import { ProjectDriver } from 'src/info/project/ProjectDriver'
import { GradleClient } from 'src/info/project/drivers/gradle/GradleClient'
import { ProjectInfo } from 'src/info/project/ProjectInfo'
import { injectable } from 'inversify'

export const GRADLE_PROJECT_TYPE = 'gradle'

@injectable()
export class GradleProjectDriver implements ProjectDriver {
    constructor(private gradle: GradleClient) {}

    getType = (): string => GRADLE_PROJECT_TYPE

    canDrive = (fileNames: string[]): boolean =>
        this.gradle.isGradleProject(fileNames)

    getInfo = (dir: string): ProjectInfo => {
        return {
            name: this.gradle.getName(dir),
            version: this.gradle.getVersion(dir)
        }
    }
}
