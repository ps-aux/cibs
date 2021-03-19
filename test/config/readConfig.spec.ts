import { readConfig } from 'src/config/readConfig'
import Path from 'path'

it('works', () => {
    const cfg = readConfig(__dirname)

    expect(cfg!.projectType).toBe('gradle')
    expect(cfg!.dockerDir).toBe(Path.resolve(process.cwd(), 'foo'))
})
