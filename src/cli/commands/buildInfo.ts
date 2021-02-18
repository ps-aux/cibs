import { Argv, CommandModule } from 'yargs'
import { Context } from 'src/ctx/Context'
import { extractGetProjectInfoCmd } from 'src/cli/options'
import { BuildInfo, getBuildInfo } from 'src/artefact-info/build/getBuildInfo'

const extractKey = (info: BuildInfo, key: string) => {
    // @ts-ignore
    if (key in info) return info[key]

    throw new Error(`Build info does not have property ${key}`)
}

const buildInfoCmd = (ctx: Context): CommandModule => ({
    command: 'build-info [key]',
    describe: 'Build commands',
    builder: (y: Argv) =>
        y.positional('key', {
            type: 'string',
            required: false
        }),
    handler: args => {
        const key = args.key as string
        ctx.disableConsoleLogging()
        const info = getBuildInfo(extractGetProjectInfoCmd(args), ctx)

        const res = key ? extractKey(info, key) : JSON.stringify(info)

        console.log(res)
    }
})

export default buildInfoCmd
