import { findFileRecursivelyUpwards } from 'src/util/file-search/findFileRecursivelyUpwards'
import Path from 'path'
import fs from 'fs'

it('found when in the same dir', () => {
    const dir = Path.resolve(__dirname, 'a')
    const f = findFileRecursivelyUpwards(dir, 'file')!!

    expect(fs.readFileSync(f).toString()).toBe('file found\n')
})

it('found when in grand parent', () => {
    const dir = Path.resolve(__dirname, 'a', 'b', 'c')
    const f = findFileRecursivelyUpwards(dir, 'file')!!

    expect(fs.readFileSync(f).toString()).toBe('file found\n')
})
