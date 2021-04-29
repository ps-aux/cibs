import { createAppContext, GlobalOptions } from './ctx/AppContext'
import { CliApp, cmd, cmdGroup } from '@ps-aux/nclif'
import {
    BuildAndPushOptions,
    DockerCmdHandler
} from './docker/DockerCmdHandler'
import { Container } from 'inversify'
import { InfoCmdHandler } from './info/InfoCmdHandler'
import { Waiter } from './wait/Waiter'
import { readConfig } from './config/readConfig'

export const createApp = (): CliApp<Container, GlobalOptions> =>
    CliApp.of<Container, GlobalOptions>({
        options: [
            {
                name: 'dir',
                description: 'Directory where to run instead of pwd.'
            },
            {
                name: 'project-type',
                description:
                    'Project type. Use if dir contains multiple project types (e.g. Npm and Gradle).',
                fromConfig: true
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
                        name: 'docker-dir',
                        fromConfig: 'dockerDir'
                    },
                    {
                        name: 'build-info-build-arg',
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
            }),
            wait: cmdGroup({
                options: [
                    {
                        name: 'timeout',
                        description: 'Timeout in seconds',
                        type: 'number'
                    }
                ],
                commands: {
                    http: cmd({
                        description: 'Wait for an HTTP endpoint to be live',
                        positionals: [
                            {
                                name: 'url',
                                description: 'URL of an HTTP endpoint',
                                required: true
                            }
                        ],
                        run: (
                            {
                                url,
                                timeout
                            }: { url: string; timeout: number | null },
                            c
                        ) =>
                            c.get(Waiter).waitForHttp(url, timeout || undefined)
                    }),
                    tcp: cmd({
                        description: 'Wait for a TCP endpoint to be live',
                        positionals: [
                            {
                                name: 'socket',
                                description: 'Socket address of a TCP endpoint',
                                required: true
                            }
                        ],
                        run: (
                            {
                                socket,
                                timeout
                            }: { socket: string; timeout: number | null },
                            c
                        ) =>
                            c
                                .get(Waiter)
                                .waitForTcp(socket, timeout || undefined)
                    })
                }
            })
        }
    })
        .addObjectConfig(readConfig)
        .context((o: GlobalOptions, proc) => {
            return createAppContext(o, proc)
        })
