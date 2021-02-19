import { ProjectInfo } from 'src/info/project/ProjectInfo'
import { ProjectDriver } from 'src/info/project/ProjectDriver'
import { FileSystem } from 'src/fs/FileSystem'
import { injectable } from 'inversify'

@injectable()
export class ProjectInfoProvider {
    private driverMap: Record<string, ProjectDriver> = {}

    constructor(
        private drivers: ProjectDriver[],
        private projectDir: string,
        private fs: FileSystem
    ) {
        for (const d of drivers) {
            const type = d.getType()
            if (this.driverMap[type])
                throw new Error(`More drivers of type ${type}`)

            this.driverMap[type] = d
        }
    }

    private driverOfType = (type: string): ProjectDriver => {
        const d = this.driverMap[type]

        if (!d) throw new Error(`No driver for project type '${type}'`)

        return d
    }

    private autodetectDriver = (dir: string): ProjectDriver => {
        const files = this.fs.listDirFiles(this.projectDir)
        const drivers = this.drivers.filter(d => d.canDrive(files))

        if (drivers.length === 0)
            throw new Error(
                `Cannot detect project type in dir ${
                    this.projectDir
                }. Supported are:
                 ${Object.keys(this.driverMap)}`
            )

        if (drivers.length > 1)
            throw new Error(
                `Multiple project types detected in dir ${
                    this.projectDir
                }: ${drivers.map(d => d.getType())}`
            )
        return drivers[0]
    }

    provide = (projectType: string | null): ProjectInfo => {
        const driver = projectType
            ? this.driverOfType(projectType)
            : this.autodetectDriver(this.projectDir)
        return driver.getInfo(this.projectDir)
    }
}
