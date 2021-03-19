import { ProjectDriver } from '../../ProjectDriver'
import { ProjectInfo } from '../../ProjectInfo'
import { NpmClient } from './NpmClient'
import { injectable } from 'inversify'

export const NPM_PROJECT_TYPE = 'npm'

@injectable()
export class NpmProjectDriver implements ProjectDriver {
    constructor(private npm: NpmClient) {}

    getType = (): string => NPM_PROJECT_TYPE

    canDrive = (fileNames: string[]): boolean => {
        for (const f of fileNames) {
            if (f === 'package.json') return true
        }

        return false
    }

    getInfo = (dir: string): ProjectInfo => {
        return {
            name: this.npm.getName(dir),
            version: this.npm.getVersion(dir)
        }
    }
}
