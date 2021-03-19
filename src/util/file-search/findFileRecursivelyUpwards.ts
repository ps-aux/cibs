import { findFileInDir } from "../fs/findFileInDir"
import Path from 'path'
import { FileSystem } from '../../fs/FileSystem'

// TODO refactor
const fs = new FileSystem()
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

    if (!fs.isValidDir(parent)) return null

    return findFileRecursivelyUpwards(parent, name, attempts - 1)
}
