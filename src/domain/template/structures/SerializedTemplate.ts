import { ObjectId } from 'bson'
import { Nullable } from '../../../utils/Nullable'

export interface SerializedTemplate {
  _id: ObjectId
  html: string
  groupId: ObjectId
  exampleImage: Nullable<string>
}
