import { ensureValidDir } from 'src/util/fs/isValidDir'
import Path from 'path'
import { listDirFiles } from 'src/util/fs/listDirFiles'

/**
 * Try to find a file and return absolute path if exists or null if not.
 */
export const findFileInDir = (dir: string, fileName: string): string | null => {
    if (!Path.isAbsolute(dir)) throw new Error('Dir path must be absolute')
    ensureValidDir(dir)

    const files = listDirFiles(dir)

    for (const f of files) {
        if (f === fileName) return Path.resolve(dir, f)
    }

    return null
}
