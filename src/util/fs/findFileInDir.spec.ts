import { findFileInDir } from 'src/util/fs/findFileInDir'

const dir = __dirname

it('existing', () => {
    const res = findFileInDir(dir, 'findFileInDir.ts')!

    expect(res[0]).toBe('/')
    expect(res).toBe(dir + '/findFileInDir.ts')
})

it('not existing', () => {
    const res = findFileInDir(dir, 'i-dont-exist')!
    expect(res).toBe(null)
})
