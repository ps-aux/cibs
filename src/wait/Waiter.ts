// @ts-ignore
import waitOn from 'wait-on'
import { inject, injectable } from 'inversify'
import { Log } from '../log/types'
import { Log_ } from '../ctx/ids'

@injectable()
export class Waiter {
    private readonly defaultTimeout = 20
    constructor(@inject(Log_) private log: Log) {}

    /**
     * @param timeout in seconds
     */
    waitForHttp = async (
        url: string,
        timeout = this.defaultTimeout
    ): Promise<void> => {
        this.log.debug(`Waiting (HTTP) for ${url} for ${timeout} seconds`)
        await waitOn({
            resources: [url],
            timeout: timeout * 1000
        })
    }

    waitForTcp = async (
        hostPort: string,
        timeout = this.defaultTimeout
    ): Promise<void> => {
        this.log.debug(`Waiting (TCP) for ${hostPort} for ${timeout} seconds`)
        waitOn({
            resources: [`tcp:${hostPort}`],
            timeout: timeout * 1000
        })
    }
}
