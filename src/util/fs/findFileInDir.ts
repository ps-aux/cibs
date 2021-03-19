import Path from 'path'
import { listDirFiles } from "./listDirFiles"
import { FileSystem } from '../../fs/FileSystem'

// TODO
const fs = new FileSystem()
/**
 * Try to find a file and return absolute path if exists or null if not.
 */
export const findFileInDir = (dir: string, fileName: string): string | null => {
    if (!Path.isAbsolute(dir)) throw new Error('Dir path must be absolute')
    fs.ensureValidDir(dir)

    const files = listDirFiles(dir)

    for (const f of files) {
        if (f === fileName) return Path.resolve(dir, f)
    }

    return null
}
