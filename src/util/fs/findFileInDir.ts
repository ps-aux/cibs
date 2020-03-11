import { ensureValidDir } from 'src/util/fs/isValidDir'
import fs from 'fs'
import Path from 'path'

/**
 * Try to find a file and return absolute path if exists or null if not.
 */
export const findFileInDir = (dir: string, fileName: string): string | null => {
    if (!Path.isAbsolute(dir)) throw new Error('Dir path must be absolute')
    ensureValidDir(dir)

    const files = fs.readdirSync(dir)

    for (const f of files) {
        if (f === fileName) return Path.resolve(dir, f)
    }

    return null
}
