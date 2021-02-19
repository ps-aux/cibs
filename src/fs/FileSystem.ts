import Path from 'path'
import { ensureValidDir } from 'src/util/fs/isValidDir'
import fs from 'fs'
import { injectable } from 'inversify'

@injectable()
export class FileSystem {
    listDirFiles = (dir: string): string[] => {
        if (!Path.isAbsolute(dir))
            throw new Error(`Dir path must be absolute but is '${dir}'`)

        ensureValidDir(dir)

        const files = fs.readdirSync(dir)

        return files.filter(f => fs.lstatSync(Path.resolve(dir, f)).isFile())
    }

    isValidDir = (path: string) =>
        fs.existsSync(path) && fs.lstatSync(path).isDirectory()

    ensureValidDir = (path: string) => {
        if (!this.isValidDir(path))
            throw new Error(`'${path} is not a directory`)
    }
}
