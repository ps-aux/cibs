import { Log } from 'src'
import { ensureContainsFile } from 'src/util/fs/containsFile'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import Path from 'path'

export class DockerClient {
    constructor(
        private readonly shell: LocalShellCmdExecutor,
        private readonly log: Log
    ) {}

    loginToRegistry = (
        apiUrl: string,
        username: string,
        password: string
    ): void => {
        this.log.debug(`Logging into ${apiUrl} as ${username}`)

        this.shell.execWithStdIn(
            `docker login --username ${username} --password-stdin ${apiUrl}`,
            password
        )
    }

    composeName = (registryName: string, imageName: string): string =>
        registryName + '/' + imageName

    build = (
        dir: string,
        name: string,
        version: string,
        buildArgs: { [key: string]: string } = {}
    ): void => {
        if (!Path.isAbsolute(dir)) throw new Error(`Dir ${dir} is not absolute`)

        ensureContainsFile(dir, 'Dockerfile')

        const buildArgsStr = Object.entries(buildArgs)
            .map(([key, val]) => `--build-arg ${key}='${val}'`)
            .join(' ')

        const tag = name + ':' + version
        this.cmd(`build ${dir} -t ${tag} ${buildArgsStr}`)
        this.cmd(`tag ${tag} ${name}:latest`)
    }

    push = (name: string): void => {
        this.cmd(`push ${name}`)
    }

    private cmd = (args: string) => {
        this.shell.exec(`docker ${args}`)
    }
}
