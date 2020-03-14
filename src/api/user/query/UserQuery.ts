import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../../generated/type-graphql";
import app from "../../../main";
import { Context } from "koa";

@Resolver(() => User)
export class UserQuery {
  @Query(() => [User])
  public async getUsers(@Ctx() context: Context) {
    return app.getServer().getPrisma()
      .user.findMany({
        where: {
          username: "PHILLIPS_71"
        }
      });
  }
}
