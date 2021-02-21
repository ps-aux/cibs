import { AppContext, createAppContext } from './ctx/AppContext'
import { CliApp, cmd, cmdGroup } from '@ps-aux/nclif'
import Path from 'path'

type GlobalOptions = {
    dir: string | null
    projectType: string | null
}

type DockerOptions = {
    dockerDir: string | null
    buildInfoBuildArg: boolean | null
}

export const createApp = (): CliApp<AppContext, GlobalOptions> =>
    CliApp.of<AppContext, GlobalOptions>({
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
                    const info = ctx.info.provide()
                    let res: string
                    if (key) {
                        if (!Object.keys(info).includes(key))
                            throw new Error(`Unknown key '${key}'`)
                        // @ts-ignore
                        res = info[key].toString()
                    } else {
                        res = JSON.stringify(info)
                    }
                    stdout(res)
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
                        run: (o: DockerOptions) => {
                            console.log('build nad pushing', o)
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
