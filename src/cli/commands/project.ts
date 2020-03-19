import { Arguments, Argv, CommandModule } from 'yargs'
import { Context } from 'src/ctx/Context'
import { getProjectInfoProvider } from 'src/info/getProjectInfoProvider'
import { getBuildVersion } from 'src/build/getBuildVersion'
import { dirOption, projectTypeOption } from 'src/cli/options'

export const getProjectVersionFromArgs = (
    args: Arguments<any>,
    ctx: Context
) => {
    const version = getProjectInfoProvider(
        projectTypeOption.getVal(args),
        dirOption.getVal(args),
        ctx
    ).version()

    return version
}

export const getBuildVersionFromArgs = (args: Arguments<any>, ctx: Context) => {
    const projectVersion = getProjectVersionFromArgs(args, ctx)
    return getBuildVersion(projectVersion, ctx.env())
}

const vpsCmd = (ctx: Context): CommandModule => ({
    command: 'project',
    describe: 'Print project info',
    builder: (y: Argv) =>
        y
            .command(
                'version', // We cannot use version as it is always boolean (probably conflicts with --version functionality)
                'Get project version (user defined part',
                y => y,
                args => {
                    console.log(getProjectVersionFromArgs(args, ctx))
                }
            )
            .command(
                'build-version',
                'Get actual build version - unique artifact identifier, project version and build number combination',
                y => y,
                args => {
                    console.log(getBuildVersionFromArgs(args, ctx))
                }
            )
            .demandCommand(),
    handler: args => {
        throw new Error('Unexpected execution path')
    }
})

export default vpsCmd
