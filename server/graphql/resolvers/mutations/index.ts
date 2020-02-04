import { global } from './global'
import * as user from './user'
import { admin } from './admin'
import { campus } from './campus'
import { question } from './question'
import { student } from './student'
import { faculty } from './faculty'

export default {
  ...global,
  ...user,
  ...admin,
  ...campus,
  ...question,
  ...student,
  ...faculty
}
