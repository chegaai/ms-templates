import rescue from 'express-rescue'
import { boom } from '@expresso/errors'
import { validate } from '@expresso/validator'
import { Request, Response, NextFunction } from 'express'
import { TemplateService } from '../../../services/TemplateService'
import { TemplateNotFoundError } from '../../../domain/template/errors/TemplateNotFoundError';

export function factory (service: TemplateService) {
  return [
    validate({
      type: 'object',
      properties: {
        html: { type: 'string' }
      },
      required: ['html'],
      additionalProperties: false
    }),
    rescue(async (req: Request, res: Response) => {
      const templateData = req.body
      const templateId = req.params.templateId
      const template = await service.update(templateId, templateData)

      res.status(200)
        .json(template)
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      if (err instanceof TemplateNotFoundError) return next(boom.notFound(err.message, { code: 'template_not_found' }))

      next(err)
    }
  ]
}
