import { listDirFiles } from './listDirFiles'

export const containsFile = (dir: string, regex: RegExp) => {
    const files = listDirFiles(dir)
    for (const f of files) {
        if (f.match(regex)) return true
    }

    return false
}

export const ensureContainsFile = (dir: string, fileName: string) => {
    if (!containsFile(dir, new RegExp('^' + fileName + '$')))
        throw new Error(`Directory ${dir} does not contain file '${fileName}'`)
}
