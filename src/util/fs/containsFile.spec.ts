import { containsFile } from 'src/util/fs/containsFile'

describe('containsFile', () => {
    it('existing', () => {
        let r = containsFile(__dirname, /^containsFile\.ts$/)
        expect(r).toBe(true)

        r = containsFile(__dirname, /^containsFile\.\w{4}\.ts/)
        expect(r).toBe(true)
    })

    it('not existing', () => {
        const r = containsFile(__dirname, /^nope-containsFile\.ts$/)
        expect(r).toBe(false)
    })
})
