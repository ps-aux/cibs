import { ProjectInfo } from 'src/info/project/ProjectInfo'

export type ProjectDriver = {
    getType: () => string

    canDrive: (fileNames: string[]) => boolean

    getInfo: (dir: string) => ProjectInfo
}
