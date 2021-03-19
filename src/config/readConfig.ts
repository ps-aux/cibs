import { findFileRecursivelyUpwards } from '../util/file-search/findFileRecursivelyUpwards'
import { validateConfig } from './validateConfig'
import { FileSystem } from '../fs/FileSystem'
import Path from 'path'

const configName = 'cibs.config.js'

type Config = {
    dockerDir?: string
    projectType?: string
}

const fs = new FileSystem()
// TODO quick solution
const normalizeDir = (dir: string): string => {
    if (fs.isAbsoluteDirPath(dir)) return dir

    return Path.resolve(process.cwd(), dir)
}

export const readConfig = (rootDir: string): any => {
    const path = findFileRecursivelyUpwards(rootDir, configName, 5)

    if (!path) return {}

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg: Config = require(path)

    validateConfig(cfg)

    if (cfg.dockerDir) {
        cfg.dockerDir = normalizeDir(cfg.dockerDir)
    }

    return cfg
}
