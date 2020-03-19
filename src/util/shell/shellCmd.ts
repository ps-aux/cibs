import { execSync } from 'child_process'

export const shellCmd = (
    cmd: string,
    {
        returnStdout,
        cwd,
        stdin
    }: { returnStdout?: boolean; cwd?: string; stdin?: string } = {}
): string | null => {
    const res = execSync(cmd, {
        cwd,
        input: stdin,
        stdio: [
            stdin ? undefined : 'inherit',
            returnStdout ? undefined : 'inherit',
            'inherit'
        ]
    })

    if (returnStdout) return res.toString().trim()

    return null
}
