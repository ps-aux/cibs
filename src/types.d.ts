export type Logger = (...args: any) => void

export type ProjectInfoProvider = {
    version: () => string
    name: () => string
}

export type CreateProjectInfoProvider = (rootDir: string) => ProjectInfoProvider
