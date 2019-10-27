import { injectable } from 'tsyringe'
import { TemplateService } from './TemplateService'

@injectable()
export class Services {
  constructor (
    public readonly template: TemplateService
  ) { }
}
