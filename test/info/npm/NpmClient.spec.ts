import Path from 'path'
import { createNpmClient } from 'src/info/npm/NpmClient'

describe('NpmClient', () => {
    const dir = Path.resolve(__dirname, 'proj1')

    const sut = createNpmClient(dir)

    it('getVersion', () => {
        const res = sut.getVersion()
        expect(res).toBe('1.2.3')
    })

    it('getName', () => {
        const res = sut.getName()
        expect(res).toBe('foo')
    })
})
