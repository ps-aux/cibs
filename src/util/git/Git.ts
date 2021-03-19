import { LocalShellCmdExecutor } from '../shell/LocalShellCmdExecutor'
import { injectable } from 'inversify'

@injectable()
export class Git {
    constructor(private readonly sh: LocalShellCmdExecutor) {}

    branch = (): string => this.exec('rev-parse --abbrev-ref HEAD')

    commitId = (): string => this.exec('rev-parse HEAD')

    commitMessage = (): string => this.exec('show -s --format=%s')

    private exec = (cmd: string): string => {
        const fullCmd = `git ${cmd}`
        return this.sh.execAndReturnVal(fullCmd)
    }
}
