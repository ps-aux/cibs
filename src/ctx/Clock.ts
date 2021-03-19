import { injectable } from 'inversify'

@injectable()
export class Clock {
    now = (): Date => new Date()
}
