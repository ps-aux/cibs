import { BuildInfo } from './BuildInfo'
import { ConfProvider } from '../../types'
import { Git } from '../../util/git/Git'
import { Clock } from '../../ctx/Clock'
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
