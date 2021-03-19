import { findFileRecursivelyUpwards } from '../../../../util/file-search/findFileRecursivelyUpwards'
import { LocalShellCmdExecutor } from '../../../../util/shell/LocalShellCmdExecutor'
import { FileSystem } from '../../../../fs/FileSystem'
import { injectable } from 'inversify'

const findGradleBin = (dir: string): string => {
    const bin = findFileRecursivelyUpwards(dir, 'gradlew')

    if (!bin) throw new Error(`Could not find Gradle binary for dir ${dir}`)

    return bin
}

@injectable()
export class GradleClient {
    constructor(private fs: FileSystem, private sh: LocalShellCmdExecutor) {
        this.sh = sh
    }

    private findBin = (fromDir: string): string => {
        if (!this.isGradleProject(this.fs.listDirFiles(fromDir)))
            throw new Error(
                `${fromDir} does not appear to be a Gradle project dir`
            )
        return findGradleBin(fromDir)
    }

    isGradleProject = (fileNames: string[]): boolean => {
        for (const f of fileNames) {
            if (f === 'build.gradle' || f === 'build.gradle.kts') return true
        }

        return false
    }

    getVersion = (dir: string): string => this.getProperty(dir, 'version')

    getName = (dir: string): string => this.getProperty(dir, 'name')

    private getProperty = (dir: string, propName: string): string => {
        const lines = this.runCmd(dir, 'properties').split('\n')
        const res = lines.find(l => l.startsWith(`${propName}:`))

        if (!res) {
            throw new Error(
                `Could not read Gradle property '${propName}' from project in dir ${dir}`
            )
        }

        return res.split(':')[1].trim()
    }

    private runCmd = (dir: string, args: string): string => {
        const bin = this.findBin(dir)
        const cmd = `${bin} ${args}`

        return this.sh.execAndReturnVal(cmd, { cwd: dir })
    }
}
