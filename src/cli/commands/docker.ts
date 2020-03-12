import { CommandModule } from 'yargs'
import { Context } from 'src/ctx/Context'
import { buildAndPushDockerImage } from 'src/buildAndPushDockerImage'
import { normalizeDir } from 'src/cli/normalizeDir'
import { dirOption } from 'src/cli/options'

const dockerCmd = (ctx: Context): CommandModule => ({
    command: 'docker',
    describe: 'Docker commands',
    builder: y =>
        y
            .option({
                'docker-dir': {
                    type: 'string'
                }
            })
            .command(
                'build-and-push', // We cannot use version as it is always boolean (probably conflicts with --version functionality)
                'Builds and pushes Docker image',
                y => y,
                args => {
                    const dockerDir = normalizeDir(args.dockerDir as string)
                    const projectDir = dirOption.getVal(args)
                    buildAndPushDockerImage(dockerDir, projectDir, ctx)
                }
            ),
    handler: args => {
        throw new Error('Assertion error')
    }
})

export default dockerCmd
