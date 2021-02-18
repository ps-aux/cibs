import { DockerClient } from 'src/docker/DockerClient'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { ConsoleLogger } from 'src/log/ConsoleLogger'
import { minimalLogger } from 'src/log/MinimalLogger'

const registryApiUrl = 'https://index.docker.io/v1/'
const registryName = 'yijohor934'
const username = 'yijohor934'
const pass = 'yijohor934@mailezee.com'

// Better not run all the day
describe.skip('DockerImageClient', () => {
    const imageName = 'cibs-test-image'

    const sut = new DockerClient(
        new LocalShellCmdExecutor(minimalLogger()),
        new ConsoleLogger()
    )

    it('works', () => {
        const name = registryName + '/' + imageName
        sut.loginToRegistry(registryApiUrl, username, pass)
        sut.build(__dirname, name, '1.2.3')
        sut.push(name)
    })
})
