import Path from 'path'

export const dataDirPath = (...parts: string[]): string =>
    Path.resolve(__dirname, ...parts)
