import { ProjectDriver } from '../../ProjectDriver'
import { GradleClient } from './GradleClient'
import { ProjectInfo } from '../../ProjectInfo'
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
