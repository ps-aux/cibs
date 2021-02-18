import { ConfProvider } from 'src'

export class EnvConfProvider implements ConfProvider {
    optionalProperty = (name: string): string | null =>
        process.env[name] as string | null

    property = (name: string): string => {
        const val = this.optionalProperty(name)
        if (!val) throw new Error(`Missing env var '${name}'`)

        return val
    }
}

export const createEnvConfProvider = () => new EnvConfProvider()
