import { findFileInDir } from 'src/util/fs/findFileInDir'
import Path from 'path'
import { isValidDir } from 'src/util/fs/isValidDir'

// TODO add max dirs ?
export const findFileRecursivelyUpwards = (
    dir: string,
    name: string,
    attempts = 5
): string | null => {
    if (attempts === 0) return null
    const f = findFileInDir(dir, name)
    if (f) return f

    const parent = Path.resolve(dir, '..')

    if (!isValidDir(parent)) return null

    return findFileRecursivelyUpwards(parent, name, attempts - 1)
}
