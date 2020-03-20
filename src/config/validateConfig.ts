import { allProjectTypes } from 'src/info/ProjectType'
import { Config } from 'src/config/Config'
import Joi from '@hapi/joi'

const Schema = () =>
    Joi.object({
        projectType: allProjectTypes
    })

export const validateConfig = (cfg: any): Config => {
    const r = Schema().validate(cfg, {
        presence: 'required',
        allowUnknown: false
    })
    if (r.error) throw new Error('Invalid config.' + r.error.message)

    return cfg as Config
}
