import { findFileRecursivelyUpwards } from '../util/file-search/findFileRecursivelyUpwards'
import { validateConfig } from './validateConfig'
import { normalizeDir } from '../util/normalizeDir'

const configName = 'cibs.config.js'

type Config = {
    dockerDir?: string
    projectType?: string
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
