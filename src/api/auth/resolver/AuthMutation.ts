import { AuthenticationError } from 'apollo-server-koa'
import { Context } from 'koa'
import { Resolver, Mutation, Ctx, Arg } from 'type-graphql'
import bcrypt from 'bcrypt'
import { User } from '../../../../generated/type-graphql'
import app from '../../../main'

@Resolver(of => User)
export default class UserQuery {
  @Mutation(type => User)
  public async doAuthenticate(@Ctx() context: Context, @Arg('email') email: string, @Arg('password') password: string) {
    return app
      .getServer()
      .getPrisma()
      .user.findOne({
        where: {
          email
        }
      })
      .then(user => {
        if (!user) {
          throw new AuthenticationError('invalid email or password combination')
        }

        return bcrypt
          .compare(password, user.password)
          .then(valid => {
            if (!valid) {
              throw new AuthenticationError('invalid email or password combination')
            }

            if (context.session) {
              context.session.user = user.id
            }

            return user
          })
          .catch(error => error)
      })
      .catch(error => error)
  }
}
