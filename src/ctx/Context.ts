import { ConfProvider, Log, Logger } from 'src'
import { createEnvConfProvider } from 'src/util/env/EnvConfProvider'

export type Context = {
    log: () => Logger
    env: () => ConfProvider
}

const doLog = console.log as Log

const cheapLogger = () => ({
    info: doLog,
    trace: doLog,
    error: doLog,
    debug: doLog
})

class ContextImpl implements Context {
    private readonly _log: Logger

    constructor() {
        this._log = cheapLogger()
    }

    log = () => this._log

    env = () => createEnvConfProvider()
}

export const createContext = (): Context => {
    return new ContextImpl()
}
