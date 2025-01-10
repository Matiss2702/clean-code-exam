export interface Request {
  body(): Promise<{ value: any }>;
}

export interface Response {
  status: number;
  body: any;
}

export interface Context {
  request: Request;
  response: Response;
  params?: Record<string, string>;
}

import { CreateUserUseCase } from "@application/user/usecases/CreateUserUseCase.ts";
import { GetUserUseCase } from "@application/user/usecases/GetUserUseCase.ts";
import { InMemoryUserRepository } from "@repositories/user/InMemoryUserRepository.ts";

export class UserController {
  constructor(
    private createUserUC = new CreateUserUseCase(new InMemoryUserRepository()),
    private getUserUC = new GetUserUseCase(new InMemoryUserRepository()),
  ) {}

public async createUser(ctx: Context) {
  try {
    const body = await ctx.request.body();
    const { name, email, password } = body.value;
    const user = await this.createUserUC.execute(name, email, password);
    ctx.response.status = 201;
    ctx.response.body = user;
  } catch (error) {
    if (error instanceof Error) {
      ctx.response.status = 400;
      ctx.response.body = { error: error.message };
    } else {
      ctx.response.status = 500;
      ctx.response.body = { error: "Unknown error" };
    }
  }
}


  public async getUser(ctx: Context) {
    try {
      const { id } = ctx.params!;
      const user = await this.getUserUC.execute(id);
      if (user) {
        ctx.response.status = 200;
        ctx.response.body = user;
      } else {
        ctx.response.status = 404;
        ctx.response.body = { error: "User not found" };
      }
    } catch (_error) {
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal Server Error" };
    }
  }
}
