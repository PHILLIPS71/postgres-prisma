import { Ctx, Resolver, Mutation, Args, Authorized } from 'type-graphql'
import { Context } from 'koa'
import bcrypt from 'bcrypt'
import { AuthenticationError } from 'apollo-server-koa'
import app from '../../../main'
import response from '../../../services/response'
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

    return app
      .getServer()
      .getPrisma()
      .user.findOne({
        where: input.where
      })
      .then(response.notFound(context))
      .then(response.isSelf(context))
      .then(user => {
        if (!user) {
          throw new AuthenticationError('cannot update other users')
        }

        return app
          .getServer()
          .getPrisma()
          .user.update(input)
      })
      .catch(error => error)
  }
}
