import { Context } from 'src/ctx/Context'
import { Argv, CommandModule } from 'yargs'
import { waitForHttp } from 'src/wait/waitForHttp'

const waitCmd = (ctx: Context): CommandModule => ({
    command: 'wait',
    describe: 'Wait for a condition',
    builder: (y: Argv) =>
        y
            .option({
                'timeout': {
                    type: 'number',
                    description: 'Timeout in ms'
                }
            })
            .command(
                'http <url>', // We cannot use version as it is always boolean (probably conflicts with --version functionality)
                'Wait for an HTTP endpoint. Must return 2xx response',
                y =>
                    y.positional('url', {
                        required: true,
                        type: 'string',
                        description: 'URL of endpoint to wait for'
                    }),
                async args => {
                    const url = args.url as string
                    const log = ctx.log()
                    log.info('Waiting for HTTP endpoint ', url)
                    await waitForHttp(url)
                    log.info(url, 'ready')
                }
            )
            .demandCommand(),
    handler: args => {
        throw new Error('Unexpected execution path')
    }
})

export default waitCmd
