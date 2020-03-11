import { Argv, CommandModule } from 'yargs'
import { Context } from 'src/ctx/Context'
import { getProjectInfoProvider } from 'src/info/getProjectInfoProvider'

const vpsCmd = (execCtx: Context): CommandModule => ({
    command: 'project',
    describe: 'Print app info',
    builder: (y: Argv) =>
        y
            .command(
                'version', // We cannot use version as it is always boolean (probably conflicts with --version functionality)
                'Get app version from a project',
                y => {
                    y.option({
                        'project-type': {
                            type: 'string',
                            alias: 'P'
                        },
                        dir: {
                            type: 'string',
                            alias: 'D'
                        }
                    })
                },
                args => {
                    const type = args.projectType as string | null
                    const argDir = args.dir as string | null

                    const version = getProjectInfoProvider(
                        type,
                        argDir
                    ).version()
                    console.log(version)
                }
            )
            .demandCommand(),
    handler: args => {
        throw new Error('Unexpected execution path')
    }
})

export default vpsCmd
