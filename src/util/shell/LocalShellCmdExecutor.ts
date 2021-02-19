import { Log } from 'src/types'
import { shellCmd } from 'src/util/shell/shellCmd'
import { inject, injectable } from 'inversify'
import { Log_ } from '../../ctx/ids'

export type ExecShellOps = {
    cwd?: string
}

@injectable()
export class LocalShellCmdExecutor {
    constructor(@inject(Log_) private log: Log) {}

    exec = (cmd: string): void => {
        this.log.debug(cmd)
        shellCmd(cmd, {
            returnStdout: false
        })
    }

    execWithStdIn = (cmd: string, stdin: string): void => {
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
