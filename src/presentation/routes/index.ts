import { factory as create } from './template/create'
import { factory as update } from './template/update'
import { factory as remove } from './template/remove'
import { factory as listAll } from './template/listAllByGroupId'
import { factory as find } from './template/find'

export const routes = {
  create,
  update,
  remove,
  find,
  listAll
}
