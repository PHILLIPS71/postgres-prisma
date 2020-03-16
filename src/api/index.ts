import { buildSchema } from 'type-graphql'
import { UserCrudResolver } from '../../generated/type-graphql'
import UserQuery from './user/query/UserQuery'

export default async function() {
  return buildSchema({
    resolvers: [UserCrudResolver, UserQuery],
    validate: false
  })
}
