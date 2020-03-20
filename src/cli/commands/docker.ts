import { CommandModule } from 'yargs'
import { Context } from 'src/ctx/Context'
import { buildAndPushDockerImage } from 'src/docker/buildAndPushDockerImage'
import { normalizeDir } from 'src/cli/normalizeDir'
import { extractGetProjectInfoCmd } from 'src/cli/options'

const dockerCmd = (ctx: Context): CommandModule => ({
    command: 'docker',
    describe: 'Docker commands',
    builder: y =>
        y
            .option({
                'docker-dir': {
                    type: 'string',
                    description: 'Dir with Dockerfile'
                },
                'build-info-build-arg': {
                    type: 'boolean',
                    description:
                        'Set to inject build info JSON as a build arg with name BUILD_INFO'
                }
            })
            .command(
                'build-and-push', // We cannot use version as it is always boolean (probably conflicts with --version functionality)
                'Builds and pushes Docker image',
                y => y,
                args => {
                    const dockerDir = args.dockerDir as string
                    const buildInfoBuildArg = !!args.buildInfoBuildArg || false
                    const projInfoCmd = extractGetProjectInfoCmd(args)
                    buildAndPushDockerImage(
                        {
                            dockerDir,
                            buildInfoBuildArg
                        },
                        projInfoCmd,
                        ctx
                    )
                }
            )
            .demandCommand(),
    handler: args => {
        throw new Error('Assertion error')
    }
})

export default dockerCmd
