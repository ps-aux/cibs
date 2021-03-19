import { ArtifactInfoProvider } from './ArtifactInfoProvider'
import { injectable } from 'inversify'

@injectable()
export class InfoCmdHandler {
    constructor(private provider: ArtifactInfoProvider) {}

    all = (): string => {
        const info = this.provider.provide()
        return JSON.stringify(info)
    }

    single = (key: string): string => {
        const info = this.provider.provide()

        if (!Object.keys(info).includes(key))
            throw new Error(`Unknown key '${key}'`)
        // @ts-ignore
        return info[key].toString()
    }
}
