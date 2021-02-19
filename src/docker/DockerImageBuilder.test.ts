import { createAppContext } from '../ctx/AppContext'
import { DockerImageBuilder } from './DockerImageBuilder'

it('test', () => {
    const ctx = createAppContext('any', 'any')

    const sut = ctx.get(DockerImageBuilder)

    console.log(sut)
})
