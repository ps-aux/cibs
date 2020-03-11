import fs from 'fs'

export const isValidDir = (path: string) =>
    fs.existsSync(path) && fs.lstatSync(path).isDirectory()

export const ensureValidDir = (path: string) => {
    if (!isValidDir(path)) throw new Error(`'${path} is not a directory`)
}
