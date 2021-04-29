import { Container } from 'inversify'
import { CliApp, Process } from '@ps-aux/nclif'
import { createAppContext, GlobalOptions } from '../../src/ctx/AppContext'
import { createApp } from '../../src/app'

export const createTestApp = (
    env?: Record<string, string>,
    setup?: (c: Container) => void
): CliApp<Container, GlobalOptions> => {
    const p: Process = {
        stdout: console.log,
        stderr: console.error,
        exit: s => {
            if (s !== 0) throw new Error(`Exited with code ${s}`)
        },
        env: env || {},
        cwd: __dirname,
        args: []
    }
    return createApp()
        .process(p)
        .context(opts => {
            const c = createAppContext(opts, p)

            if (setup) setup(c)
            return c
        })
}
