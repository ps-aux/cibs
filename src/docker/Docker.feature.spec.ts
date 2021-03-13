import { DockerClient } from './DockerClient'
import td from 'testdouble'
import { ArtifactInfoProvider } from '../info/ArtifactInfoProvider'
import { ArtifactInfo } from '../info/ArtifactInfo'
import { createTestApp } from '../../test/app/createTestApp'

it('build and push', async () => {
    // Given
    const env = {
        BUILD_NO: '123',
        DOCKER_REGISTRY_NAME: 'mock@DOCKER_REGISTRY_NAME',
        DOCKER_REGISTRY_API_URL: 'mock@DOCKER_REGISTRY_API_URL',
        DOCKER_REGISTRY_LOGIN_USERNAME: 'mock@DOCKER_REGISTRY_LOGIN_USERNAME',
        DOCKER_REGISTRY_LOGIN_PASSWORD: 'mock@DOCKER_REGISTRY_LOGIN_PASSWORD'
    }

    const info: ArtifactInfo = {
        name: 'my-artifact',
        commit: 'sha-123',
        version: 'my-version',
        commitMessage: 'cmd-mesg',
        buildTime: 'now',
        buildNumber: '123'
    }
    const infoProvider = td.object<ArtifactInfoProvider>()
    td.when(infoProvider.provide()).thenReturn(info)

    const dockerClient = td.object<DockerClient>()
    td.when(
        dockerClient.composeName(env.DOCKER_REGISTRY_NAME, info.name)
    ).thenReturn('my-image-name')

    const dir = __dirname

    // When
    await createTestApp(env, c => {
        c.rebind(DockerClient).toConstantValue(dockerClient)
        c.rebind(ArtifactInfoProvider).toConstantValue(infoProvider)
    }).run([
        'docker',
        'build-and-push',
        '--dir=any',
        `--docker-dir=${dir}`,
        '--build-info-build-arg'
    ])

    // Then
    td.verify(
        dockerClient.loginToRegistry(
            env.DOCKER_REGISTRY_API_URL,
            env.DOCKER_REGISTRY_LOGIN_USERNAME,
            env.DOCKER_REGISTRY_LOGIN_PASSWORD
        )
    )
    td.verify(
        dockerClient.build(dir, 'my-image-name', info.version, {
            BUILD_INFO: JSON.stringify(info)
        })
    )
    td.verify(dockerClient.push('my-image-name'))
})
