import { buildSchema } from 'type-graphql'
import { UserRelationsResolver, FindManyUserResolver } from '../../generated/type-graphql'
import authentication from '../services/graphql/authentication'
import AuthMutation from './auth/resolver/AuthMutation'
import UserMutation from './user/resolver/UserMutation'

export default async function() {
  return buildSchema({
    resolvers: [UserRelationsResolver, FindManyUserResolver, UserMutation, AuthMutation],
    validate: false,
    authChecker: authentication
  })
}
