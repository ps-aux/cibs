import { execSync } from 'child_process'

export const shellCmd = (
    cmd: string,
    { returnStdout, cwd }: { returnStdout?: boolean; cwd?: string } = {}
) =>
    execSync(cmd, {
        cwd,
        stdio: ['inherit', returnStdout ? undefined : 'inherit', 'inherit']
    })
