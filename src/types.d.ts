import { Context } from 'src/ctx/Context'

export type LogMsg = (...args: any) => void

export type Log = {
    info: LogMsg
    debug: LogMsg
    error: LogMsg
}

export type ProjectInfoProvider = {
    version: () => string
    name: () => string
}

export type ProjectMatcher = (dirFiles: string[]) => boolean

export type CreateProjectInfoProvider = (
    dir: string,
    ctx: Context
) => ProjectInfoProvider

export type ConfProvider = {
    property: (name: string) => string

    optionalProperty: (name: string) => string | null
}
