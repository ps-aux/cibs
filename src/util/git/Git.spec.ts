import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { Git } from 'src/util/git/Git'

it('Git naive test', () => {
    const git = new Git(new LocalShellCmdExecutor())

    const r = {
        branch: git.branch(),
        commitId: git.commitId(),
        commitMsg: git.commitMessage()
    }

    expect(r.branch).toMatch(/^...*$/)
    expect(r.commitMsg).toMatch(/^...*$/)
    expect(r.commitId).toMatch(/^([\da-z])*$/)
})
