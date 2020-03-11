import { buildDockerImage } from 'src/docker/buildDockerImage'

describe('docker', () => {
    it('buildDockerImage', () => {
        buildDockerImage('foo', '123', __dirname)
    })
})
