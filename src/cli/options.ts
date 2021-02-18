import { Arguments, Options } from 'yargs'
import { normalizeDir } from 'src/cli/normalizeDir'
import { GetProjectInfoCmd } from 'src/artefact-info/getProjectInfo'
import { PROJECT_TYPE } from 'src/artefact-info/ProjectType'

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

export const projectTypeOption: Option<PROJECT_TYPE | undefined> = {
    name: 'project-type',
    def: {
        type: 'string',
        alias: 'P'
    },
    getVal: (args: Arguments) => {
        return (args.projectType as PROJECT_TYPE) || undefined
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
