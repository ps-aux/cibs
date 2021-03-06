import { LocalShellCmdExecutor } from '../shell/LocalShellCmdExecutor'
import { Git } from './Git'
import { minimalLogger } from '../../log/MinimalLogger'

it('Git naive test', () => {
    const git = new Git(new LocalShellCmdExecutor(minimalLogger()))

    const r = {
        branch: git.branch(),
        commitId: git.commitId(),
        commitMsg: git.commitMessage()
    }

    expect(r.branch).toMatch(/^...*$/)
    expect(r.commitMsg).toMatch(/^...*$/)
    expect(r.commitId).toMatch(/^([\da-z])*$/)
})
