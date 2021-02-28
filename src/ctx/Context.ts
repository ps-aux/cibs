import { ConfProvider, Log } from 'src/types'
import { Git } from 'src/util/git/Git'
import { ConsoleLogger } from 'src/log/ConsoleLogger'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { Config } from 'src/config/Config'
import { readConfig } from 'src/config/readConfig'
import { EnvConfProvider } from '../util/env/EnvConfProvider'

export type Context = {
    log: () => Log
    env: () => ConfProvider
    git: () => Git
    shell: () => LocalShellCmdExecutor
    now: () => Date
    config: () => Config | null
    disableConsoleLogging: () => void
}

class ContextImpl implements Context {
    private readonly _log: ConsoleLogger
    private readonly sh: LocalShellCmdExecutor
    private readonly _config: Config | null

    constructor(rootDir: string) {
        this._log = new ConsoleLogger()
        this.sh = new LocalShellCmdExecutor(this._log)
        this._config = readConfig(rootDir)
    }

    shell = () => this.sh

    log = () => this._log

    disableConsoleLogging = () => {
        this._log.setEnabled(false)
    }

    config = () => this._config

    env = () => new EnvConfProvider(process.env)

    git = () => new Git(this.sh)

    now = () => new Date()
}

export const createContext = (rootDir: string): Context => {
    return new ContextImpl(rootDir)
}
