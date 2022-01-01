// TODO quick solution
import Path from 'path'
import { FileSystem } from '../fs/FileSystem'

const fs = new FileSystem()
export const normalizeDir = (dir: string): string => {
    if (fs.isAbsoluteDirPath(dir)) return dir

    return Path.resolve(process.cwd(), dir)
}
