import { DockerImageClient } from 'src/docker/DockerImageClient'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { ConsoleLogger } from 'src/log/ConsoleLogger'

const registryApiUrl = 'https://index.docker.io/v1/'
const registryName = 'yijohor934'
const username = 'yijohor934'
const pass = 'yijohor934@mailezee.com'

describe('DockerImageClient', () => {
    const imageName = 'cibs-test-image'

    const log = new ConsoleLogger()

    const sut = new DockerImageClient(
        registryApiUrl,
        registryName,
        imageName,
        new LocalShellCmdExecutor(),
        log
    )

    it('works', () => {
        sut.loginToRegistry(username, pass)
        sut.build(__dirname, '1.2.3')
        sut.push()
    })
})
