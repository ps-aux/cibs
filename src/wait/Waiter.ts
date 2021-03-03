// @ts-ignore
import waitOn from 'wait-on'
import { inject, injectable } from 'inversify'
import { Log } from '../log/types'
import { Log_ } from '../ctx/ids'

@injectable()
export class Waiter {
    private readonly defaultTimeout = 30
    constructor(@inject(Log_) log: Log) {}

    /**
     * @param timeout in seconds
     */
    waitForHttp = async (
        url: string,
        timeout = this.defaultTimeout
    ): Promise<void> =>
        waitOn({
            resources: [url],
            timeout: timeout * 1000
        })

    waitForTcp = async (
        hostPort: string,
        timeout = this.defaultTimeout
    ): Promise<void> =>
        waitOn({
            resources: [`tcp:${hostPort}`],
            timeout: timeout * 1000
        })
}
