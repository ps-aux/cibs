// @ts-ignore
import waitOn from 'wait-on'

export const waitForHttp = async (url: string, timeout = 30000) =>
    waitOn({
        resources: [url],
        timeout
    })
