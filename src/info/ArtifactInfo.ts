import { BuildInfo } from './build/BuildInfo'

export type ArtifactInfo = BuildInfo & {
    name: string
    version: string
}
