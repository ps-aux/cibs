import { Log } from '../log/types'
import { ensureContainsFile } from '../util/fs/containsFile'
import { LocalShellCmdExecutor } from '../util/shell/LocalShellCmdExecutor'
import Path from 'path'
import { inject, injectable } from 'inversify'
import { Log_ } from '../ctx/ids'
import { FileSystem } from '../fs/FileSystem'

@injectable()
export class DockerClient {
    constructor(
        private readonly shell: LocalShellCmdExecutor,
        private readonly fs: FileSystem,
        @inject(Log_) private readonly log: Log
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
        if (!this.fs.isAbsoluteDirPath(dir))
            throw new Error(`Dir ${dir} is not absolute`)

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
