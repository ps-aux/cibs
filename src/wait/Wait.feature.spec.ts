import { createTestApp } from '../../test/app/createTestApp'
import express from 'express'
import { Server } from 'http'

const startHttpServer = (port: number, delay: number): (() => void) => {
    const app = express()

    let server: Server | undefined
    setTimeout(() => {
        app.get('/', (req, res) => {
            res.send('Hello World!')
        })
        server = app.listen(port)
    }, delay)
    return () => {
        if (!server) throw new Error('Server not started yet')
        server.close()
    }
}

describe('wait', () => {
    const app = createTestApp()

    const port = 50123

    it('for http', async () => {
        const close = startHttpServer(port, 1000)
        await app.run([
            'wait',
            'http',
            `http://localhost:${port}`,
            '--timeout=2'
        ])
        close()
    })

    it('for tcp', async () => {
        const close = startHttpServer(port, 1000)
        await app.run(['wait', 'tcp', `localhost:${port}`, '--timeout=2'])
        close()
    })
})
