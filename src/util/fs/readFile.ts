import fs from 'fs'

export const readFile = (path: string) => {
    const content = fs.readFileSync(path).toString()
    return content
}
