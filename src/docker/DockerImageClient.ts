import { Log } from 'src'
import { ensureContainsFile } from 'src/util/fs/containsFile'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import Path from 'path'

export class DockerImageClient {
    private readonly fullName: string

    constructor(
        private readonly registryApiUrl: string,
        registryName: string,
        imageName: string,
        private readonly shell: LocalShellCmdExecutor,
        private readonly log: Log
    ) {
        this.fullName = registryName + '/' + imageName
    }

    loginToRegistry = (username: string, password: string) => {
        this.log.debug(`Logging into ${this.registryApiUrl} as ${username}`)

        this.shell.execWithStdIn(
            `docker login --username ${username} --password-stdin ${this.registryApiUrl}`,
            password
        )
    }

    build = (
        dir: string,
        version: string,
        buildArgs: { [key: string]: string } = {}
    ) => {
        if (!Path.isAbsolute(dir)) throw new Error(`Dir ${dir} is not absolute`)

        ensureContainsFile(dir, 'Dockerfile')

        const buildArgsStr = Object.entries(buildArgs)
            .map(([key, val]) => `--build-arg ${key}='${val}'`)
            .join(' ')

        const tag = this.fullName + ':' + version
        this.cmd(`build ${dir} -t ${tag} ${buildArgsStr}`)
        this.cmd(`tag ${tag} ${this.fullName}:latest`)
    }

    push = () => {
        this.cmd(`push ${this.fullName}`)
    }

    private cmd = (args: string) => {
        this.shell.exec(`docker ${args}`)
    }
}
