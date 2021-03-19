import { Log } from './types'

export class ConsoleLogger implements Log {
    private enabled = true

    debug = (...args: any[]): void => {
        if (this.enabled) console.log(...args)
    }

    info = (...args: any[]): void => {
        if (this.enabled) console.log(...args)
    }

    error = console.error

    setEnabled = (enabled: boolean): void => {
        this.enabled = enabled
    }
}
