import { buildSchema } from 'type-graphql'
import { UserCrudResolver } from '../../generated/type-graphql'
import authentication from '../services/graphql/authentication'
import AuthMutation from './auth/resolver/AuthMutation'
import UserQuery from './user/resolver/UserQuery'
import UserMutation from './user/resolver/UserMutation'

export default async function() {
  return buildSchema({
    resolvers: [UserCrudResolver, AuthMutation, UserQuery, UserMutation],
    validate: false,
    authChecker: authentication
  })
}
