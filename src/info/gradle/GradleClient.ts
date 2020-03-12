import { findFileRecursivelyUpwards } from 'src/util/file-search/findFileRecursivelyUpwards'
import { shellCmd } from 'src/util/shell/shellCmd'
import { isGradleProject } from 'src/info/gradle/isGradleProject'
import { listDirFiles } from 'src/util/fs/listDirFiles'

const findGradleBin = (dir: string) => {
    const bin = findFileRecursivelyUpwards(dir, 'gradlew')!!

    if (!bin) throw new Error(`Could not find Gradle binary for dir ${dir}`)

    return bin
}

class GradleClient {
    private readonly bin: string
    private readonly dir: string

    constructor(dir: string) {
        if (!isGradleProject(listDirFiles(dir)))
            throw new Error(`${dir} does not appear to be a Gradle project dir`)
        this.dir = dir
        this.bin = findGradleBin(dir)
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
        return shellCmd(cmd, {
            returnStdout: true,
            cwd: this.dir
        }) as string
    }
}

export const createGradleClient = (dir: string) => new GradleClient(dir)
