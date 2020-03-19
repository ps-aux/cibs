import { Log } from 'src'
import { ensureContainsFile } from 'src/util/fs/containsFile'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'

export class DockerImageClient {
    private readonly imageName: string
    private readonly log: Log
    private readonly registryName: string
    private readonly registryApiUrl: string
    private readonly sh: LocalShellCmdExecutor

    constructor(
        registryApiUrl: string,
        registryName: string,
        imageName: string,
        shell: LocalShellCmdExecutor,
        log: Log
    ) {
        this.registryName = registryName
        this.registryApiUrl = registryApiUrl
        this.imageName = registryName + '/' + imageName
        this.log = log
        this.sh = shell
    }

    loginToRegistry = (username: string, password: string) => {
        this.log.debug(`Loging into ${this.registryApiUrl} as ${username}`)

        this.sh.execWithStdIn(
            `docker login --username ${username} --password-stdin ${this.registryApiUrl}`,
            password
        )
    }

    build = (
        dir: string,
        version: string,
        buildArgs: { [key: string]: string } = {}
    ) => {
        ensureContainsFile(dir, 'Dockerfile')

        const buildArgsStr = Object.entries(buildArgs)
            .map(([key, val]) => `--build-arg ${key}='${val}'`)
            .join(' ')

        const tag = this.imageName + ':' + version
        this.cmd(`build ${dir} -t ${tag} ${buildArgsStr}`)
        this.cmd(`tag ${tag} ${this.imageName}:latest`)
    }

    push = () => {
        this.cmd(`push ${this.imageName}`)
    }

    private cmd = (args: string) => {
        this.sh.exec(`docker ${args}`)
    }
}
