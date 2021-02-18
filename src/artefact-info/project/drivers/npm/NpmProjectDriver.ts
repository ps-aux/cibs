import { ProjectDriver } from 'src/artefact-info/project/ProjectDriver'
import { ProjectInfo } from 'src/artefact-info/project/ProjectInfo'
import { NpmClient } from 'src/artefact-info/project/drivers/npm/NpmClient'

export class NpmProjectDriver implements ProjectDriver {
    constructor(private npm: NpmClient) {}

    canDrive = (fileNames: string[]): boolean => {
        for (const f of fileNames) {
            if (f === 'package.json') return true
        }

        return false
    }

    getInfo(): ProjectInfo {
        return {
            name: this.npm.getName(),
            version: this.npm.getVersion()
        }
    }
}
