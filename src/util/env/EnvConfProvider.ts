import { ConfProvider } from 'src/types'

export class EnvConfProvider implements ConfProvider {
    constructor(private env: Record<string, string | undefined>) {}

    optionalProperty = (name: string): string | null =>
        this.env[name] as string | null

    property = (name: string): string => {
        const val = this.optionalProperty(name)
        if (!val) throw new Error(`Missing env var '${name}'`)

        return val
    }
}
