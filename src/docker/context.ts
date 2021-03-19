import { Container } from 'inversify'
import { DockerClient } from './DockerClient'
import { DockerImageBuilder } from './DockerImageBuilder'
import { DockerCmdHandler } from './DockerCmdHandler'

export const addDockerContext = (c: Container): void => {
    c.bind(DockerClient).toSelf()
    c.bind(DockerImageBuilder).toSelf()
    c.bind(DockerCmdHandler).toSelf()
}
