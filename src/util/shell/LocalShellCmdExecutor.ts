import { minimalLogger } from 'src/log/MinimalLogger'
import { Log } from 'src/types'
import { shellCmd } from 'src/util/shell/shellCmd'

export type ExecShellOps = {
    cwd?: string
}

export class LocalShellCmdExecutor {
    private log: Log

    constructor(log?: Log) {
        this.log = log || minimalLogger()
    }

    exec = (cmd: string) => {
        this.log.debug(cmd)
        shellCmd(cmd, {
            returnStdout: false
        })
    }

    execWithStdIn = (cmd: string, stdin: string) => {
        this.log.debug(`"${stdin}" > ${cmd}`)
        shellCmd(cmd, {
            stdin,
            returnStdout: false
        })
    }

    execAndReturnVal = (cmd: string, ops?: ExecShellOps) => {
        this.log.debug(cmd, '[stdout consumed]')
        return shellCmd(cmd, {
            returnStdout: true,
            ...ops
        }) as string
    }
}
