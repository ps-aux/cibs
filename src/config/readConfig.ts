import { findFileRecursivelyUpwards } from '../util/file-search/findFileRecursivelyUpwards'
import { validateConfig } from './validateConfig'

const configName = 'cibs.config.js'

export const readConfig = (rootDir: string): any => {
    const path = findFileRecursivelyUpwards(rootDir, configName, 5)

    if (!path) return {}

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg = require(path)

    validateConfig(cfg)

    return cfg
}
