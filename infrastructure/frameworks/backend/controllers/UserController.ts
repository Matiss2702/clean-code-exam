import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateUserUseCase } from "@application/user/usecases/CreateUserUseCase.ts";
import { LoginUserUseCase } from "@application/user/usecases/LoginUserUseCase.ts";
import { GetUserUseCase } from "@application/user/usecases/GetUserUseCase.ts";
import { GetAllUsersUseCase } from "@application/user/usecases/GetAllUsersUseCase.ts";

// Define specific context types
type RegisterContext = RouterContext<"/register">;
type LoginContext = RouterContext<"/login">;
type GetUserContext = RouterContext<
  "/users/:id",
  {
    id: string;
  }
>;
type GetAllUsersContext = RouterContext<"/users">;

export class UserController {
  constructor(
    private createUserUC: CreateUserUseCase,
    private loginUserUC: LoginUserUseCase,
    private getUserUC: GetUserUseCase,
    private getAllUsersUC: GetAllUsersUseCase // ✅ Ajout de la dépendance
  ) {}

  /**
   * Création d'un utilisateur
   */
  public async createUser(ctx: RegisterContext) {
    let parsedBody;
    try {
      const body = ctx.request.body({ type: "json" });
      parsedBody = await body.value;
      console.log("✅ Body reçu :", parsedBody);
    } catch (err) {
      console.error(err);
      ctx.response.status = 400;
      ctx.response.body = { error: "Body invalide ou requête interrompue" };
      return;
    }

    const { firstName, lastName, email, password } = parsedBody;
    try {
      if (!firstName || !lastName || !email || !password) {
        console.error("Champs manquants :", { firstName, lastName, email, password });
        ctx.throw(400, "Tous les champs sont requis.");
      }

      const name = `${firstName} ${lastName}`;

      const user = await this.createUserUC.execute(name, email, password);

      ctx.response.status = 201;
      ctx.response.body = { message: "Utilisateur créé avec succès", user };
    } catch (error) {
      console.error(error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Connexion d'un utilisateur
   */
  public async loginUser(ctx: LoginContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      const { email, password } = await body.value;

      if (!email || !password) {
        ctx.throw(400, "Email et mot de passe requis.");
      }

      const token = await this.loginUserUC.execute(email, password);
      ctx.response.status = 200;
      ctx.response.body = { message: "Connexion réussie", token };
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'un utilisateur par ID
   */
  public async getUser(ctx: GetUserContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID utilisateur requis.");
      }

      const user = await this.getUserUC.execute(id);

      if (!user) {
        ctx.throw(404, "Utilisateur non trouvé.");
      }

      console.log("✅ Utilisateur trouvé :", user);
      ctx.response.status = 200;
      ctx.response.body = user;
    } catch (error) {
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
  public async getAllUsers(ctx: GetAllUsersContext) {
    try {
      const users = await this.getAllUsersUC.execute();
      ctx.response.status = 200;
      ctx.response.body = users;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
