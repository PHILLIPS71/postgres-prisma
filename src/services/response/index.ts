import { Context } from 'koa'
import { User } from '../../../generated/type-graphql'
import app from '../../main'
import NotFoundError from '../apollo/error/NotFoundError'

const isSelf = (context: Context) => async (entity: User | null): Promise<User | null> => {
  if (entity) {
    const user = await app
      .getServer()
      .getPrisma()
      .user.findOne({
        where: {
          id: context.session?.user
        }
      })
      .catch(error => error)

    if (entity.id === user.id) {
      return entity
    }

    return null
  }

  context.response.status = 404
  throw new NotFoundError('404 not found')
}

const notFound = (context: Context) => (entity: User | null) => {
  if (entity) {
    return entity
  }

  context.response.status = 404
  throw new NotFoundError('404 not found')
}

export default { isSelf, notFound }
