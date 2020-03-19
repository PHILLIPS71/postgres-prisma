import { Context } from 'koa'
import { User } from '../../../generated/type-graphql'
import app from '../../main'

const isSelf = (context: Context): Promise<User> => {
  return app
    .getServer()
    .getPrisma()
    .user.findOne({
      where: {
        id: context.session?.user
      }
    })
    .catch(error => error)
}

export default isSelf
