import { Context } from 'koa'
import { Ctx, Query, Resolver, Authorized } from 'type-graphql'
import app from '../../../main'
import { User } from '../../../../generated/type-graphql'

@Resolver(of => User)
export default class UserQuery {
  @Authorized()
  @Query(type => [User])
  public async getUsers(@Ctx() context: Context) {
    return app
      .getServer()
      .getPrisma()
      .user.findMany()
  }
}
