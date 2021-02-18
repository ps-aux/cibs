import { findFileInDir } from 'src/util/fs/findFileInDir'
import { readFile } from 'src/util/fs/readFile'

type PackageJson = {
    name: string
    version: string
}

const readPackageJson = (path: string): PackageJson => {
    const json: any = JSON.parse(readFile(path))

    const ensureProp = (name: string) => {
        if (json[name] === undefined || json[name] === '')
            throw new Error(
                `package.json at ${path} does not contain required property ${name}`
            )
    }

    ensureProp('name')
    ensureProp('version')

    return json as PackageJson
}

export class NpmClient {
    private readonly packageJson: PackageJson

    constructor(dir: string) {
        const packageJsonPath = findFileInDir(dir, 'package.json')
        if (!packageJsonPath)
            throw new Error(
                `${dir} is not a npm project dir. Does not contain package.json`
            )

        this.packageJson = readPackageJson(packageJsonPath)
    }

    getVersion = () => this.packageJson.version

    getName = () => this.packageJson.name
}
