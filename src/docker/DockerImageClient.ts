import { shellCmd } from 'src/util/shell/shellCmd'
import { Logger } from 'src'
import { ensureContainsFile } from 'src/util/fs/containsFile'

export class DockerImageClient {
    private readonly imageName: string
    private readonly log: Logger
    private readonly registryName: string
    private readonly registryApiUrl: string

    constructor(
        registryApiUrl: string,
        registryName: string,
        imageName: string,
        log: Logger
    ) {
        this.registryName = registryName
        this.registryApiUrl = registryApiUrl
        this.imageName = registryName + '/' + imageName
        this.log = log
    }

    loginToRegistry = (username: string, password: string) => {
        this.log.debug(`Loging into ${this.registryApiUrl} as ${username}`)

        shellCmd(
            `docker login --username ${username} --password-stdin ${this.registryApiUrl}`,
            {
                stdin: password
            }
        )
    }

    build = (dir: string, version: string) => {
        ensureContainsFile(dir, 'Dockerfile')

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
