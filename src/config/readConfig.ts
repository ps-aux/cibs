import { findFileRecursivelyUpwards } from 'src/util/file-search/findFileRecursivelyUpwards'
import { Config } from 'src/config/Config'
import { validateConfig } from 'src/config/validateConfig'

const configName = 'cibs.config.js'

export const readConfig = (rootDir: string): Config | null => {
    const path = findFileRecursivelyUpwards(rootDir, configName, 5)

    if (!path) return null

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg = require(path)

    return validateConfig(cfg)
}
