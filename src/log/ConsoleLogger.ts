import { Log } from 'src'

export class ConsoleLogger implements Log {
    private enabled = true

    debug = (...args: any) => {
        if (this.enabled) console.log(...args)
    }

    info = (...args: any) => {
        if (this.enabled) console.log(...args)
    }

    error = console.error

    setEnabled = (enabled: boolean) => {
        this.enabled = enabled
    }
}
