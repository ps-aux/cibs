import { createAppContext, Handlers } from './ctx/AppContext'
import { CliApp, cmd, cmdGroup } from '@ps-aux/nclif'
import Path from 'path'
import { BuildAndPushOptions } from './docker/DockerCmdHandler'

type GlobalOptions = {
    dir: string | null
    projectType: string | null
}

export const createApp = (): CliApp<Handlers, GlobalOptions> =>
    CliApp.of<Handlers, GlobalOptions>({
        options: [
            {
                name: 'dir',
                description: 'Directory where to run instead of pwd.'
            },
            {
                name: 'projectType',
                description:
                    'Project type. Use if dir contains multiple project types (e.g. Npm and Gradle).'
            }
        ],
        commands: {
            info: cmd({
                description: 'Artifact info',
                positionals: [
                    {
                        name: 'key',
                        description: 'Build info key'
                    }
                ],
                run: ({ key }: { key?: string }, { info }, { stdout }) => {
                    stdout(key ? info.single(key) : info.all())
                }
            }),
            docker: cmdGroup({
                options: [
                    {
                        name: 'dockerDir'
                    },
                    {
                        name: 'buildInfoBuildArg',
                        type: 'boolean'
                    }
                ],
                commands: {
                    'build-and-push': cmd({
                        run: (o: BuildAndPushOptions, { docker }) => {
                            docker.buildAndPush(o)
                        }
                    })
                }
            })
        }
    }).context((o: GlobalOptions) => {
        let dir = process.cwd()

        if (o.dir) {
            if (!Path.isAbsolute(o.dir))
                dir = Path.resolve(process.cwd(), o.dir)
            else {
                dir = o.dir
            }
        }
        return createAppContext(dir, o.projectType)[0]
    })
