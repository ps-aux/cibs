import Yargs from 'yargs'
import versionCmd from 'src/cli/commands/info'
import { Context } from 'src/ctx/Context'

const entrypoint = (ctx: Context) =>
    Yargs.scriptName('cibs')
        .usage('$0 <cmd> [args]')
        .command(versionCmd(ctx))
        .alias('h', 'help')
        .help()
        // https://github.com/yargs/yargs/issues/895#issuecomment-392893305
        .demandCommand()
        .recommendCommands()
        .strict()

export default entrypoint
