export { Log, LogMsg } from './log/types'

export type ConfProvider = {
    property: (name: string) => string

    optionalProperty: (name: string) => string | null
}
