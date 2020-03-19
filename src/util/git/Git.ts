import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'

export class Git {
    private readonly sh: LocalShellCmdExecutor

    constructor(sh: LocalShellCmdExecutor) {
        this.sh = sh
    }

    branch = (): string => this.exec('rev-parse --abbrev-ref HEAD')

    commitId = (): string => this.exec('rev-parse HEAD')

    commitMessage = (): string => this.exec('show -s --format=%s')

    private exec = (cmd: string): string => {
        const fullCmd = `git ${cmd}`
        return this.sh.execAndReturnVal(fullCmd)
    }
}
