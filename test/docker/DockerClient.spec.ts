import { DockerClient } from 'src/docker/DockerClient'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { ConsoleLogger } from 'src/log/ConsoleLogger'
import { FileSystem } from '../../src/fs/FileSystem'

const registryApiUrl = 'https://index.docker.io/v1/'
const registryName = 'yijohor934'
const username = 'yijohor934'
const pass = 'yijohor934@mailezee.com'

// Will be run manually for now
describe.skip('DockerClient', () => {
    const imageName = 'cibs-test-image'

    const l = new ConsoleLogger()
    const sut = new DockerClient(
        new LocalShellCmdExecutor(l),
        new FileSystem(),
        l
    )

    it('works', () => {
        const name = registryName + '/' + imageName
        sut.loginToRegistry(registryApiUrl, username, pass)
        sut.build(__dirname, name, '1.2.3')
        sut.push(name)
    })
})
