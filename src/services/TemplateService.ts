// import axios from 'axios'
import { ObjectId } from 'bson'
import { injectable } from 'tsyringe'
import { screenshotFromHtml } from '../utils/HTML'
import { renderTemplate } from '../utils/HTML'
import { Template } from '../domain/template/Template'
import { GroupClient } from '../data/clients/GroupClient'
import { PaginatedQueryResult } from '@nindoo/mongodb-data-layer'
import { TemplateRepository } from '../data/repositories/TemplateRepository'
import { GroupNotFoundError } from '../domain/template/errors/GroupNotFoundError'
import { CreateTemplateData } from '../domain/template/structures/CreateTemplateData'
import { TemplateNotFoundError } from '../domain/template/errors/TemplateNotFoundError'
import { BlobStorageClient } from '../data/clients/BlobStorageClient'

@injectable()
export class TemplateService {
  constructor (
    private readonly groupClient: GroupClient,
    private readonly blobStorageClient: BlobStorageClient,
    private readonly repository: TemplateRepository,
  ) { }

  private async uploadBase64(base64: string){
    try{
      const url = await this.blobStorageClient.uploadBase64(base64, 'image/*')
      if(!url)
        throw Error() //TODO: throw better error handler
    }catch(error){
      console.log(error)
    }
    return 'url'
  }

  async create (creationData: CreateTemplateData): Promise<Template> {
    const group = await this.groupClient.findGroupById(creationData.groupId)
    if (!group) throw new GroupNotFoundError(creationData.groupId as string)

    const html = await renderTemplate(creationData.html)
    const base64 = await screenshotFromHtml({ html })

    creationData.exampleImage = await this.uploadBase64(base64)
    const template = Template.create(new ObjectId(), creationData)

    return this.repository.save(template)
  }

  async update (id: string, dataToUpdate: Partial<CreateTemplateData>): Promise<Template> {
    const currentTemplate = await this.repository.findById(id)
    if (!currentTemplate) throw new TemplateNotFoundError(id)

    const html = await renderTemplate(dataToUpdate.html as string)
    const base64 = await screenshotFromHtml({ html })

    dataToUpdate.exampleImage = await this.uploadBase64(base64)
    const newTemplate = {
      ...currentTemplate,
      html: dataToUpdate.html
    }

    currentTemplate.update(newTemplate as CreateTemplateData)

    return this.repository.save(currentTemplate)
  }

  async delete (id: string): Promise<void> {
    const template = await this.repository.findById(id)
    if (!template) return

    template.delete()

    await this.repository.save(template)
  }

  async find (id: string): Promise<Template> {
    const template = await this.repository.findById(id)

    if (!template) throw new TemplateNotFoundError(id)
    return template
  }

  async listAllByGroupId (groupId: string, page: number = 0, size: number = 10): Promise<PaginatedQueryResult<Template>> {
    return this.repository.getAllByGroupId(groupId, page, size)
  }
}
