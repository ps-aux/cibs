import { BuildInfo } from 'src/artefact-info/build/BuildInfo'

export type ArtefactInfo = BuildInfo & {
    name: string
    version: string
}
