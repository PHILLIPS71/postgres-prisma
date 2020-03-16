import { ApolloServer } from 'apollo-server-koa'
import schema from '../../api'

export default async function() {
  return new ApolloServer({
    schema: await schema(),
    playground: true,
    context: ({ ctx }) => ctx
  })
}
