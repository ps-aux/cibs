import { createAppContext, GlobalOptions } from './ctx/AppContext'
import { CliApp, cmd, cmdGroup } from '@ps-aux/nclif'
import {
    BuildAndPushOptions,
    DockerCmdHandler
} from './docker/DockerCmdHandler'
import { Container } from 'inversify'
import { InfoCmdHandler } from './info/InfoCmdHandler'

export const createApp = (): CliApp<Container, GlobalOptions> =>
    CliApp.of<Container, GlobalOptions>({
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
                run: ({ key }: { key?: string }, ctx, { stdout }) => {
                    const info = ctx.get(InfoCmdHandler)
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
                        run: (o: BuildAndPushOptions, c) => {
                            c.get(DockerCmdHandler).buildAndPush(o)
                        }
                    })
                }
            })
        }
    }).context((o: GlobalOptions, proc) => {
        return createAppContext(o, proc)
    })
