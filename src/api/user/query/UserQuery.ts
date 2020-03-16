import { Query, Resolver } from 'type-graphql'
import { User } from '../../../../generated/type-graphql'
import app from '../../../main'

@Resolver(() => User)
export default class UserQuery {
  @Query(() => [User])
  static async getUsers() {
    return app
      .getServer()
      .getPrisma()
      .user.findMany({
        where: {
          username: 'PHILLIPS_71'
        }
      })
  }
}
