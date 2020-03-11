import { Logger } from 'src'

export type Context = {
    log: () => Logger
}

class ContextImpl implements Context {
    private readonly _log: Logger

    constructor() {
        this._log = console.log as Logger
    }

    log = () => this._log
}

export const createContext = (): Context => {
    return new ContextImpl()
}
