import rescue from 'express-rescue'
import { Request, Response, NextFunction } from 'express'
import { TemplateService } from '../../../services/TemplateService'
import { validate } from '@expresso/validator'

export function factory (service: TemplateService) {
  return [
    validate.query({
      type: 'object',
      properties: {
        page: { type: 'number', default: 0 },
        size: { type: 'number', default: 10 }
      }
    }),
    rescue(async (req: Request, res: Response) => {
      const templates = await service.listAllByGroupId(req.params.groupId, req.query.page, req.query.size)

      res.status(200)
        .set({
          'x-range-from': templates.range.from,
          'x-range-to': templates.range.to,
          'x-range-total': templates.total,
          'x-range-size': templates.count
        })
        .json(templates.results)
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      next(err)
    }
  ]
}
