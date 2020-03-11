import { shellCmd } from 'src/util/shell/shellCmd'

export class DockerClient {
    private readonly imageName: string

    constructor(registryName: string, imageName: string) {
        this.imageName = registryName + '/' + imageName
    }

    buildImage = (dir: string, version: string) => {
        const tag = this.imageName + ':' + version
        shellCmd(`docker build ${dir} -t ${tag}`)
        shellCmd(`docker tag ${tag} ${this.imageName}:latest`)
    }

    pushImages = () => {
        shellCmd(`docker push ${this.imageName}`)
    }

    private runCmd = (args: string) => {
        shellCmd(`docker ${args}`)
    }
}
