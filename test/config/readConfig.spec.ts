import { readConfig } from 'src/config/readConfig'

it('works', () => {
    const cfg = readConfig(__dirname)

    expect(cfg!.projectType).toBe('gradle')
})
