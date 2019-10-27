import rescue from 'express-rescue'
import { boom } from '@expresso/errors'
import { validate } from '@expresso/validator'
import { Request, Response, NextFunction } from 'express'
import { TemplateService } from '../../../services/TemplateService'
import { GroupNotFoundError } from '../../../domain/template/errors/GroupNotFoundError'


export function factory (service: TemplateService) {
  return [
    validate({
      type: 'object',
      properties: {
        html: { type: 'string' },
        groupId: { type: 'string' }
      },
      required: ['html', 'groupId'],
      additionalProperties: false
    }),
    rescue(async (req: Request, res: Response) => {
      const templateData = req.body
      const template = await service.create(templateData)

      res.status(201)
        .json(template)
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      if (err instanceof GroupNotFoundError) return next(boom.conflict(err.message, { code: 'group_not_found' }))

      next(err)
    }
  ]
}
