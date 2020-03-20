import { Context } from 'koa'
import { User } from '../../../generated/type-graphql'
import app from '../../main'
import NotFoundError from '../apollo/error/NotFoundError'

const isSelf = (context: Context) => (entity: User | null): Promise<User> | null => {
  if (entity) {
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

  return null
}

const notFound = (context: Context) => (entity: User | null) => {
  if (entity) {
    return entity
  }

  context.response.status = 404
  throw new NotFoundError('404 not found')
}

export default { isSelf, notFound }
