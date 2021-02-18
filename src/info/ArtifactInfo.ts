import { BuildInfo } from 'src/info/build/BuildInfo'

export type ArtifactInfo = BuildInfo & {
    name: string
    version: string
}
