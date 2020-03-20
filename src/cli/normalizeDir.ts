import Path from 'path'

// TODO move to ctx
export const normalizeDir = (providedDir: string | null | undefined) => {
    const cwd = process.cwd()
    if (!providedDir) return cwd
    if (Path.isAbsolute(providedDir)) return providedDir
    return Path.resolve(cwd, providedDir)
}
