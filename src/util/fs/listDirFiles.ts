import fs from 'fs'
import Path from 'path'
import { ensureValidDir } from 'src/util/fs/isValidDir'

export const listDirFiles = (dir: string): string[] => {
    if (!Path.isAbsolute(dir)) throw new Error('Dir path must be absolute')

    ensureValidDir(dir)

    const files = fs.readdirSync(dir)

    return files.filter(f => fs.lstatSync(Path.resolve(dir, f)).isFile())
}
