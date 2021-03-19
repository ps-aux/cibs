import Path from 'path'
import { NpmClient } from 'src/info/project/drivers/npm/NpmClient'

describe('NpmClient', () => {
    const dir = Path.resolve(__dirname, 'proj1')

    const sut = new NpmClient()

    it('getVersion', () => {
        const res = sut.getVersion(dir)
        expect(res).toBe('4.5.6')
    })

    it('getName', () => {
        const res = sut.getName(dir)
        expect(res).toBe('npm-proj')
    })
})
