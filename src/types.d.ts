export type Log = (...args: any) => void
export type Logger = {
    info: Log
    debug: Log
    error: Log
}

export type ProjectInfoProvider = {
    version: () => string
    name: () => string
}

export type ProjectMatcher = (dirFiles: string[]) => boolean

export type CreateProjectInfoProvider = (dir: string) => ProjectInfoProvider

export type ConfProvider = {
    property: (name: string) => string

    optionalProperty: (name: string) => string | null
}
