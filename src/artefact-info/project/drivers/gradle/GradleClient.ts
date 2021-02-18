import { findFileRecursivelyUpwards } from 'src/util/file-search/findFileRecursivelyUpwards'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { FileSystem } from 'src/fs/FileSystem'

const findGradleBin = (dir: string) => {
    const bin = findFileRecursivelyUpwards(dir, 'gradlew')!!

    if (!bin) throw new Error(`Could not find Gradle binary for dir ${dir}`)

    return bin
}

export class GradleClient {
    private readonly bin: string
    private readonly dir: string
    private readonly sh: LocalShellCmdExecutor

    constructor(dir: string, sh: LocalShellCmdExecutor) {
        const fs = new FileSystem()
        if (!this.isGradleProject(fs.listDirFiles(dir)))
            throw new Error(`${dir} does not appear to be a Gradle project dir`)
        this.dir = dir
        this.bin = findGradleBin(dir)
        this.sh = sh
    }

    isGradleProject = (fileNames: string[]): boolean => {
        for (const f of fileNames) {
            if (f === 'build.gradle' || f === 'build.gradle.kts') return true
        }

        return false
    }

    getVersion = () => this.getProperty('version')

    getName = () => this.getProperty('name')

    private getProperty = (propName: string): string => {
        const lines = this.runCmd('properties').split('\n')
        const res = lines.find(l => l.startsWith(`${propName}:`))

        if (!res) {
            throw new Error(
                `Could not read Gradle property '${propName}' from project in dir ${this.dir}`
            )
        }

        return res.split(':')[1].trim()
    }

    private runCmd = (args: string): string => {
        const cmd = `${this.bin} ${args}`

        return this.sh.execAndReturnVal(cmd, { cwd: this.dir })
    }
}
