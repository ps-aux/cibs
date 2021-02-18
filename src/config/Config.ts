import { PROJECT_TYPE } from 'src/artefact-info/ProjectType'

export type Config = {
    projectType: PROJECT_TYPE
    dockerDir?: string
}
