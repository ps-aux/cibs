import { ConfProvider, Log } from 'src'
import { createEnvConfProvider } from 'src/util/env/EnvConfProvider'
import { Git } from 'src/util/git/Git'
import { ConsoleLogger } from 'src/log/ConsoleLogger'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'

export type Context = {
    log: () => Log
    env: () => ConfProvider
    git: () => Git
    shell: () => LocalShellCmdExecutor
}

class ContextImpl implements Context {
    private readonly _log: Log
    private readonly sh: LocalShellCmdExecutor

    constructor() {
        this._log = new ConsoleLogger()
        this.sh = new LocalShellCmdExecutor(this._log)
    }

    shell = () => this.sh

    log = () => this._log

    env = () => createEnvConfProvider()

    git = () => new Git(this.sh)
}

export const createContext = (): Context => {
    return new ContextImpl()
}
