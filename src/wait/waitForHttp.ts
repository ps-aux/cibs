// @ts-ignore
import waitOn from 'wait-on'

export const waitForHttp = async (url: string) => {
    waitOn({
        resources: [url]
    })
}
