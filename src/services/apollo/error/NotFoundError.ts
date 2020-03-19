import { ApolloError } from 'apollo-server-koa'

export default class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, 'NOT_FOUND')
    Object.defineProperty(this, 'name', { value: 'not found' })
  }
}
