import { Arguments, Options } from 'yargs'
import { normalizeDir } from 'src/cli/normalizeDir'
import { GetProjectInfoCmd } from 'src/info/getProjectInfo'

type Option<T> = {
    name: string
    def: Options
    getVal: (args: Arguments) => T
}

export const extractGetProjectInfoCmd = (
    args: Arguments
): GetProjectInfoCmd => ({
    dir: dirOption.getVal(args),
    projectType: projectTypeOption.getVal(args)
})

export const projectTypeOption: Option<string | undefined> = {
    name: 'project-type',
    def: {
        type: 'string',
        alias: 'P'
    },
    getVal: (args: Arguments) => {
        return (args.projectType as string) || undefined
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
