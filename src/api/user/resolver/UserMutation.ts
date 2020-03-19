import { Ctx, Resolver, Mutation, Args, Authorized } from 'type-graphql'
import { Context } from 'koa'
import bcrypt from 'bcrypt'
import NotFoundError from '../../../services/apollo/error/NotFoundError'
import app from '../../../main'
import isSelf from '../../../services/response'
import { User, UpdateOneUserArgs, CreateOneUserArgs } from '../../../../generated/type-graphql'

@Resolver(of => User)
export default class UserMutation {
  @Mutation(type => User)
  public async doUserCreate(@Args() input: CreateOneUserArgs) {
    // replace with subscription once prisma2 adds support
    await bcrypt.hash(input.data.password, 9).then(hash => {
      input.data.password = hash
    })

    return app
      .getServer()
      .getPrisma()
      .user.create(input)
  }

  @Authorized()
  @Mutation(type => User)
  public async doUserUpdate(@Ctx() context: Context, @Args() input: UpdateOneUserArgs) {
    if (input.data.password) {
      // replace with subscription once prisma2 adds support
      await bcrypt.hash(input.data.password, 9).then(hash => {
        input.data.password = hash
      })
    }

    return isSelf(context)
      .then(user =>
        app
          .getServer()
          .getPrisma()
          .user.update(input)
      )
      .catch(error => new NotFoundError('user not found'))
  }
}
