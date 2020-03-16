import config from 'config'
import Server from './services/server/index'
import 'reflect-metadata'

export class Application {
  private readonly ip: string
  private readonly port: number
  private readonly server: Server

  constructor(ip: string, port: number) {
    this.ip = ip
    this.port = port
    this.server = new Server()
    this.server.start(ip, port).catch(console.error)
  }

  public getServer() {
    return this.server
  }
}

export default new Application(config.get('ip'), config.get('port'))
