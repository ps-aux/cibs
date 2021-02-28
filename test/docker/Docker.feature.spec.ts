import { createApp } from '../../src/app'
import { CliApp, Process } from '@ps-aux/nclif'
import { createAppContext, GlobalOptions } from '../../src/ctx/AppContext'
import { Container } from 'inversify'
import { dataDirPath } from '../_data/dataDirPath'
import { DockerClient } from '../../src/docker/DockerClient'
import td from 'testdouble'
import { LocalShellCmdExecutor } from '../../src/util/shell/LocalShellCmdExecutor'
import { ArtifactInfoProvider } from '../../src/info/ArtifactInfoProvider'
import { BuildInfo } from '../../src/info/build/BuildInfo'
import { ArtifactInfo } from '../../src/info/ArtifactInfo'

const testApp = (
    env?: Record<string, string>,
    setup?: (c: Container) => void
): CliApp<Container, GlobalOptions> => {
    const p: Process = {
        stdout: console.log,
        stderr: console.error,
        exit: s => {
            if (s !== 0) throw new Error(`Exited with code ${s}`)
        },
        env: env || {},
        cwd: __dirname,
        args: []
    }
    return createApp()
        .process(p)
        .context(opts => {
            const c = createAppContext(opts, p)

            if (setup) setup(c)
            return c
        })
}
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
    await testApp(env, c => {
        c.rebind(DockerClient).toConstantValue(dockerClient)
        c.rebind(ArtifactInfoProvider).toConstantValue(infoProvider)
    }).run(['docker', 'build-and-push', `--dir=${dir}`, '--buildInfoBuildArg'])

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
