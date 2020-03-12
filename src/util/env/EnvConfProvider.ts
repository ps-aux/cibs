import { ConfProvider } from 'src'

class EnvConfProvider implements ConfProvider {
    optionalProperty = (name: string) => process.env[name] as string | null

    property = (name: string) => {
        const val = this.optionalProperty(name)
        if (!val) throw new Error(`Missing env var '${name}'`)

        return val
    }
}

export const createEnvConfProvider = () => new EnvConfProvider()
