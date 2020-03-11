export type Logger = (...args: any) => void

export type ProjectInfoProvider = {
    version: () => string
    name: () => string
}

export type ProjectMatcher = (dirFiles: string[]) => boolean

export type CreateProjectInfoProvider = (rootDir: string) => ProjectInfoProvider

export type ConfProvider = {
    property: (name: string) => string

    optionalProperty: (name: string) => string | null
}
