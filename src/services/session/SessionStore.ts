/* eslint-disable no-underscore-dangle */
import app from '../../main'
import ISession from './interface/ISession'

export default class SessionStore {
  /**
   * Finds the data stored within a session, if that
   * session exists
   *
   * @param id sid value passed from cookie
   */
  public async get(id: string) {
    return app
      .getServer()
      .getPrisma()
      .session.findOne({
        where: {
          sid: id
        }
      })
      .catch(() => null)
  }

  /**
   * Updates or creates session documents
   *
   * @param id sid value passed from cookie
   * @param data an object which holds the session data
   * @param maxAge a long to signify when the session ends
   * @param changed weather the session has been changed
   * @param rolling weather the session is rolling
   */
  public async set(
    id: string,
    data: ISession,
    maxAge: number,
    { changed, rolling }: { changed: boolean; rolling: boolean }
  ) {
    if (changed || rolling) {
      return app
        .getServer()
        .getPrisma()
        .session.upsert({
          where: {
            sid: id
          },
          create: {
            sid: id,
            user: data.user,
            max_age: maxAge,
            expire: data._expire
          },
          update: {
            max_age: maxAge,
            expire: data._expire
          }
        })
    }

    return data
  }

  /**
   * destroys any active session so it can no longer
   * be used
   *
   * @param id sid value passed from cookie
   */
  public async destroy(id: string) {
    return app
      .getServer()
      .getPrisma()
      .session.delete({
        where: {
          sid: id
        }
      })
  }
}
