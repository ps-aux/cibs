import { BuildInfo } from 'src/info/build/BuildInfo'
import { ConfProvider } from 'src'
import { Git } from 'src/util/git/Git'
import { Clock } from 'src/ctx/Clock'

export const BUILD_NO_ENV_VAR_NAME = 'BUILD_NO'

export class BuildInfoProvider {
    constructor(
        private env: ConfProvider,
        private git: Git,
        private clock: Clock
    ) {}

    provide = (): BuildInfo => {
        const buildNumber = this.env.property(BUILD_NO_ENV_VAR_NAME)

        return {
            buildNumber,
            commit: this.git.commitId(),
            commitMessage: this.git.commitMessage(),
            buildTime: this.clock.now().toISOString()
        }
    }
}
