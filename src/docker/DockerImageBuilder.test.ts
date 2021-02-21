import { createAppContext } from '../ctx/AppContext'
import { DockerImageBuilder } from './DockerImageBuilder'

it('test', () => {
    const ctx = createAppContext('any', 'any')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    const sut = ctx.get(DockerImageBuilder)

    // sut.buildAndPublish()
})
