import { ConfProvider } from 'src'

export const getBuildVersion = (
    projectVersion: string,
    envConf: ConfProvider
) => {
    const buildNo = envConf.property('BUILD_NO')

    return projectVersion + '-' + buildNo
}
