import { ApolloServer } from 'apollo-server-koa'
import config from 'config'
import Koa from 'koa'
import { PrismaClient } from '@prisma/client'
import schema from '../../api/index'

export default class Server {
  private readonly koa: Koa
  private readonly prisma: PrismaClient

  constructor() {
    this.koa = new Koa()

    this.prisma = new PrismaClient()
    this.prisma.connect()
  }

  public async start(ip: string, port: number) {
    const apollo = new ApolloServer({
      schema: await schema(),
      playground: true,
      context: ({ ctx }) => ctx
    })

    this.koa.use(apollo.getMiddleware())

    this.koa.listen(port, ip, () => {
      console.info('Koa server listening on http://%s:%d, in %s mode', ip, port, config.get('node_env'))
    })
  }

  public getPrisma() {
    return this.prisma
  }
}
