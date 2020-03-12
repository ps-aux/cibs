import { shellCmd } from 'src/util/shell/shellCmd'
import { Logger } from 'src'
import { containsFile } from 'src/util/fs/containsFile'

export class DockerImageClient {
    private readonly imageName: string
    private readonly log: Logger
    private readonly registry: string

    constructor(registryName: string, imageName: string, log: Logger) {
        this.registry = registryName
        this.imageName = registryName + '/' + imageName
        this.log = log
    }

    loginToRegistry = (username: string, password: string) => {
        this.log.debug(`Loging into ${this.registry} as ${username}`)

        shellCmd(`docker login --username ${username} --password-stdin`, {
            stdin: password
        })
    }

    build = (dir: string, version: string) => {
        if (!containsFile(dir, 'Dockerfile'))
            throw new Error(`Dir ${dir} does not contain Dockerfile`)

        const tag = this.imageName + ':' + version
        shellCmd(`docker build ${dir} -t ${tag}`)
        shellCmd(`docker tag ${tag} ${this.imageName}:latest`)
    }

    push = () => {
        shellCmd(`docker push ${this.imageName}`)
    }

    private runCmd = (args: string) => {
        shellCmd(`docker ${args}`)
    }
}
