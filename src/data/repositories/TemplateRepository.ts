import { MongodbRepository, PaginatedQueryResult } from '@nindoo/mongodb-data-layer'
import { ObjectId } from 'bson'
import { inject, injectable } from 'tsyringe'
import { Db } from 'mongodb'
import { SerializedTemplate } from '../../domain/template/structures/SerializedTemplate'
import { Template } from '../../domain/template/Template'

@injectable()
export class TemplateRepository extends MongodbRepository<Template, SerializedTemplate> {
  static collection = 'templates'
  constructor (@inject('MongodbConnection') connection: Db) {
    super(connection.collection(TemplateRepository.collection))
  }

  serialize (entity: Template) {
    return entity.toObject()
  }

  deserialize (data: SerializedTemplate): Template {
    const { _id, ...templateData } = data
    return Template.create(_id, templateData)
  }

  async existsByName (name: string): Promise<boolean> {
    return this.existsBy({ name, deletedAt: null })
  }

  async getAllByGroupId (groupId: string, page: number, size: number): Promise<PaginatedQueryResult<Template>> {
    return this.runPaginatedQuery({ deletedAt: null, groupId }, page, size)
  }

  async findManyById (communityIds: ObjectId[], page: number, size: number): Promise<PaginatedQueryResult<Template>> {
    return this.runPaginatedQuery({ _id: { $in: communityIds }, deletedAt: null }, page, size)
  }
}
