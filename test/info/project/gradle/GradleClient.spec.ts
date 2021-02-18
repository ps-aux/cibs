import { GradleClient } from 'src/artefact-info/project/drivers/gradle/GradleClient'
import Path from 'path'
import { LocalShellCmdExecutor } from 'src/util/shell/LocalShellCmdExecutor'

describe('GradleClient', () => {
    const dir = Path.resolve(__dirname, 'proj1', 'submodule')

    const sut = new GradleClient(dir, new LocalShellCmdExecutor())

    it('getVersion', () => {
        const res = sut.getVersion()
        expect(res).toBe('1.2.3')
    })

    it('getName', () => {
        const res = sut.getName()
        expect(res).toBe('submodule')
    })
})
