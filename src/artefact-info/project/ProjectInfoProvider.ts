import { ProjectInfo } from 'src/artefact-info/project/ProjectInfo'
import { ProjectDriver } from 'src/artefact-info/project/ProjectDriver'
import { FileSystem } from 'src/fs/FileSystem'

export class ProjectInfoProvider {
    constructor(
        private drivers: ProjectDriver[],
        private projectDir: string,
        private fs: FileSystem
    ) {}

    provider = (): ProjectInfo => {
        const files = this.fs.listDirFiles(this.projectDir)

        const drivers = this.drivers.filter(d => d.canDrive(files))

        if (drivers.length === 0)
            throw new Error(
                `Cannot detect project type in dir ${this.projectDir}`
            )

        if (drivers.length > 1)
            throw new Error(
                `Cannot determine single project type in dir ${this.projectDir}`
            )

        return drivers[0].getInfo()
    }
}
