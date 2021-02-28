import { GradleClient } from 'src/info/project/drivers/gradle/GradleClient'
import Path from 'path'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'
import { FileSystem } from 'src/fs/FileSystem'
import { minimalLogger } from 'src/log/MinimalLogger'

describe('GradleClient', () => {
    const dir = Path.resolve(__dirname, 'proj1', 'submodule')

    const sut = new GradleClient(
        new FileSystem(),
        new LocalShellCmdExecutor(minimalLogger())
    )

    it('getVersion', () => {
        const res = sut.getVersion(dir)
        expect(res).toBe('1.2.3')
    })

    it('getName', () => {
        const res = sut.getName(dir)
        expect(res).toBe('submodule')
    })
})
