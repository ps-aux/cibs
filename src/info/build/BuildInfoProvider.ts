import { BuildInfo } from 'src/info/build/BuildInfo'
import { ConfProvider } from '../../types'
import { Git } from 'src/util/git/Git'
import { Clock } from 'src/ctx/Clock'
import { inject, injectable } from 'inversify'
import { ConfProvider_ } from '../../ctx/ids'

export const BUILD_NO_ENV_VAR_NAME = 'BUILD_NO'

@injectable()
export class BuildInfoProvider {
    constructor(
        @inject(ConfProvider_) private env: ConfProvider,
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
