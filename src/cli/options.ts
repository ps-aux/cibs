import { Arguments, Options } from 'yargs'
import { normalizeDir } from 'src/cli/normalizeDir'

type Option<T> = {
    name: string
    def: Options
    getVal: (args: Arguments) => T
}

export const projectTypeOption: Option<string | null> = {
    name: 'project-type',
    def: {
        type: 'string',
        alias: 'P'
    },
    getVal: (args: Arguments) => {
        return (args.projectType as string) || null
    }
}

export const dirOption: Option<string> = {
    name: 'dir',
    def: {
        type: 'string',
        alias: 'D'
    },
    getVal: (args: Arguments) => {
        return normalizeDir(args.dir as string)
    }
}
