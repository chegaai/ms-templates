import rescue from 'express-rescue'
import { boom } from '@expresso/errors'
import { Request, Response, NextFunction } from 'express'
import { TemplateService } from '../../../services/TemplateService'
import { TemplateNotFoundError } from '../../../domain/template/errors/TemplateNotFoundError'

export function factory (service: TemplateService) {
  return [
    rescue(async (req: Request, res: Response) => {
      const templateId = req.params.templateId
      const template = await service.find(templateId)

      res.status(200)
        .json(template)
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      if (err instanceof TemplateNotFoundError) return next(boom.notFound(err.message, { code: 'template_not_found' }))

      next(err)
    }
  ]
}
