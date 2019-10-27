import { ObjectId } from 'bson'
import { Nullable } from '../../utils/Nullable'
import { BaseEntity, BaseEntityData } from '../BaseEntity'
import { CreateTemplateData } from './structures/CreateTemplateData'

export class Template extends BaseEntity {
  id: ObjectId = new ObjectId()
  html: string = ''
  groupId: ObjectId = new ObjectId()
  exampleImage: Nullable<string> = null

  static create (id: ObjectId, data: CreateTemplateData & BaseEntityData): Template {
    const template = new Template()
    template.id = id
    template.html = data.html
    template.groupId = new ObjectId(data.groupId)
    template.exampleImage = data.exampleImage

    if (data.createdAt) template.createdAt = data.createdAt
    if (data.updatedAt) template.updatedAt = data.updatedAt
    if (data.deletedAt) template.deletedAt = data.deletedAt

    return template
  }

  update (dataToUpdate: CreateTemplateData) {
    this.html = dataToUpdate.html
    this.groupId = new ObjectId(dataToUpdate.groupId)
    this.updatedAt = new Date()
    this.exampleImage = dataToUpdate.exampleImage

    return this
  }

  toObject () {
    return {
      _id: this.id,
      html: this.html,
      groupId: this.groupId,
      exampleImage: this.exampleImage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}
