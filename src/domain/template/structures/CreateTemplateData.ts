import { ObjectId } from 'bson'
import { Nullable } from '../../../utils/Nullable'

export interface CreateTemplateData {
  html: string,
  groupId: string | ObjectId,
  exampleImage: Nullable<string>
}
