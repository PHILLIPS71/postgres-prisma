import { ApolloServer } from 'apollo-server-koa'
import config from 'config'
import cors from '@koa/cors'
import Koa, { Context } from 'koa'
import { PrismaClient } from '@prisma/client'
import session from 'koa-session'
import _ from 'lodash'
import schema from '../../api/index'
import SessionStore from '../session/SessionStore'

export default class Server {
  private readonly koa: Koa
  private readonly prisma: PrismaClient

  constructor() {
    this.koa = new Koa()

    this.prisma = new PrismaClient()
    this.prisma.connect()

    this.koa.keys = [config.get('session.secret')]
    this.koa.use(
      cors({
        origin: config.get('origin'),
        credentials: true
      })
    )

    this.koa.use(
      session(
        {
          store: new SessionStore(),
          key: 'SID',
          maxAge: 86400000,
          renew: true
        },
        this.koa
      )
    )
  }

  public async start(ip: string, port: number) {
    const apollo = new ApolloServer({
      schema: await schema(),
      playground: true,
      context: ({ ctx }) => _.merge(ctx, { prisma: this.prisma })
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
