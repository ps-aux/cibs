export type LogMsg = (...args: any) => void

export type Log = {
    info: LogMsg
    debug: LogMsg
    error: LogMsg
}
