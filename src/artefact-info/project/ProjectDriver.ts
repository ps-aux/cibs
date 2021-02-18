import { ProjectInfo } from 'src/artefact-info/project/ProjectInfo'

export type ProjectDriver = {
    canDrive: (fileNames: string[]) => boolean

    getInfo: () => ProjectInfo
}
