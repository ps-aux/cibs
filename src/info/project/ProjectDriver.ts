import { ProjectInfo } from './ProjectInfo'

export type ProjectDriver = {
    getType: () => string

    canDrive: (fileNames: string[]) => boolean

    getInfo: (dir: string) => ProjectInfo
}
