import fs from 'fs'
import Path from 'path'
import { FileSystem } from '../../fs/FileSystem'

const myFs = new FileSystem()
export const listDirFiles = (dir: string): string[] => {
    if (!Path.isAbsolute(dir)) throw new Error('Dir path must be absolute')

    myFs.ensureValidDir(dir)

    const files = fs.readdirSync(dir)

    return files.filter(f => fs.lstatSync(Path.resolve(dir, f)).isFile())
}
