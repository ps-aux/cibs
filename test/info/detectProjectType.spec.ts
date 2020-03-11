import { detectProjectType } from 'src/info/detectProjectType'
import Path from 'path'

describe('detectProjectType', () => {
    it('gradle', () => {
        const res = detectProjectType(
            Path.resolve(__dirname, 'gradle', 'proj1')
        )
        expect(res).toBe('gradle')
    })

    it('npm', () => {
        const res = detectProjectType(Path.resolve(__dirname, 'npm', 'proj1'))
        expect(res).toBe('npm')
    })
})
