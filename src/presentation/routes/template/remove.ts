import rescue from 'express-rescue'
import { Request, Response, NextFunction } from 'express'
import { TemplateService } from '../../../services/TemplateService'

export function factory (service: TemplateService) {
  return [
    rescue(async (req: Request, res: Response) => {
      const templateId = req.params.templateId
      await service.delete(templateId)

      res.status(204).end()
    }),
    (err: any, _req: Request, _res: Response, next: NextFunction) => {
      next(err)
    }
  ]
}
