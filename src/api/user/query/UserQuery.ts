import { Query, Resolver } from 'type-graphql'
import app from '../../../main'
import { User } from '../../../../generated/type-graphql'

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
