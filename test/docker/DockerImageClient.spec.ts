import { DockerImageClient } from 'src/docker/DockerImageClient'
import { Logger } from 'src'

const registryApiUrl = 'https://docker.io'
const registryName = 'yijohor934'
const username = 'yijohor934'
const pass = 'yijohor934@mailezee.com'

describe('DockerImageClient', () => {
    const imageName = 'cibs-test-image'

    const log = {
        debug: console.log
    } as Logger

    const sut = new DockerImageClient(
        registryApiUrl,
        registryName,
        imageName,
        log
    )

    it('works', () => {
        sut.loginToRegistry(username, pass)
        sut.build(__dirname, '1.2.3')
        sut.push()
    })
})
