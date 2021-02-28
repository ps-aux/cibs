import Yargs from 'yargs'
import { Context } from 'src/ctx/Context'
import waitCmd from 'src/cli/commands/wait'

const entrypoint = (ctx: Context) => {
    try {
        // eslint-disable-next-line no-unused-expressions
        Yargs.scriptName('cibs')
            // .option(projectTypeOption.name, projectTypeOption.def)
            // .option(dirOption.name, dirOption.def)
            .usage('$0 <cmd> [args]')
            // .command(versionCmd(ctx))
            // .command(dockerCmd(ctx))
            .command(waitCmd(ctx))
            .alias('h', 'help')
            .help()
            // https://github.com/yargs/yargs/issues/895#issuecomment-392893305
            .demandCommand()
            .recommendCommands()
            .strict().argv
    } catch (err) {
        console.log(err)
        console.error('Error:', err.message)
        process.exit(1)
    }
}

export default entrypoint
