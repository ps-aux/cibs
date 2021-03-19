import { allProjectTypes } from '../info/ProjectType'
import Joi from '@hapi/joi'

const Schema = () =>
    Joi.object({
        projectType: allProjectTypes,
        dockerDir: Joi.string().optional()
    })

export const validateConfig = (cfg: any): void => {
    const r = Schema().validate(cfg, {
        presence: 'required',
        allowUnknown: false
    })
    if (r.error) throw new Error('Invalid config.' + r.error.message)
}
