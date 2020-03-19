import { AuthChecker } from 'type-graphql'
import { Context } from 'koa'

const authentication: AuthChecker<Context> = ({ root, args, context, info }, roles) => {
  return context.session?.user != null
}

export default authentication
