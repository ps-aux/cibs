import { createGradleClient } from 'src/info/gradle/GradleClient'
import Path from 'path'

describe('GradleClient', () => {
    const dir = Path.resolve(__dirname, 'proj1', 'submodule')

    const sut = createGradleClient(dir)

    it('getVersion', () => {
        const res = sut.getVersion()
        expect(res).toBe('1.2.3')
    })

    it('getName', () => {
        const res = sut.getName()
        expect(res).toBe('submodule')
    })
})
