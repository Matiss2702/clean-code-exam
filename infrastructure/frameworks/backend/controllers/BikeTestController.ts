import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateBikeTestUseCase } from "@application/bike/usecases/CreateBikeTestUseCase.ts";
import { GetBikeTestUseCase } from "@application/bike/usecases/GetBikeTestUseCase.ts";
import { UpdateBikeTestUseCase } from "@application/bike/usecases/UpdateBikeTestUseCase.ts";
import { DeleteBikeTestUseCase } from "@application/bike/usecases/DeleteBikeTestUseCase.ts";
import { AcceptBikeTestUseCase } from "@application/bike/usecases/AcceptBikeTestUseCase.ts";
import { GetBikeUseCase } from "@application/bike/usecases/GetBikeUseCase.ts";
import { BikeTestDTO } from "@application/bike/dto/BikeTestDTO.ts";

type CreateBikeTestContext = RouterContext<"/bike-test">;
type GetBikeTestContext = RouterContext<"/bike-test/:id", { id: string }>;
type GetAllBikeTestsContext = RouterContext<"/bike-test">;
type UpdateBikeTestContext = RouterContext<"/bike-test/:id", { id: string }>;
type AcceptBikeTestContext = RouterContext<"/bike-test/:id/accept", { id: string }>;
type DeleteBikeTestContext = RouterContext<"/bike-test/:id", { id: string }>;

export class BikeTestController {
  constructor(
    private createBikeTestUseCase: CreateBikeTestUseCase,
    private getBikeTestUseCase: GetBikeTestUseCase,
    private updateBikeTestUseCase: UpdateBikeTestUseCase,
    private deleteBikeTestUseCase: DeleteBikeTestUseCase,
    private acceptBikeTestUseCase: AcceptBikeTestUseCase,
    private getBikeUseCase: GetBikeUseCase
  ) {}

  async create(ctx: CreateBikeTestContext) {
    try {
      const body = await ctx.request.body({ type: "json" }).value;
      if (!body) {
        ctx.throw(400, "Requête invalide");
      }

      const { user_id, bike_id, started_at, days } = body;
      if (!user_id || !bike_id || !started_at || days < 1) {
        ctx.throw(400, "Tous les champs sont requis : user_id, bike_id, started_at, days (>=1)");
      }

      const startDate = new Date(started_at.year, started_at.month - 1, started_at.day);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + days);

      const bike = await this.getBikeUseCase.execute(bike_id);
      if (!bike) {
        ctx.throw(404, "Moto non trouvée");
      }

      const totalPrice = bike.price * days;

      const bikeTestData: BikeTestDTO = {
        id: crypto.randomUUID(),
        user_id,
        bike_id,
        started_at: startDate,
        ended_at: endDate,
        price: totalPrice,
        is_accepted: false,
      };

      const bikeTest = await this.createBikeTestUseCase.execute(bikeTestData);

      ctx.response.status = 201;
      ctx.response.body = { message: "Test de moto créé avec succès", bikeTest };
    } catch (error) {
      ctx.response.status = error.status || 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  async get(ctx: GetBikeTestContext) {
    try {
      const { id } = ctx.params;
      if (!id) ctx.throw(400, "ID du test de moto requis");

      const bikeTest = await this.getBikeTestUseCase.execute(id);
      if (!bikeTest) ctx.throw(404, "Test de moto non trouvé");

      ctx.response.status = 200;
      ctx.response.body = bikeTest;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  async getAll(ctx: GetAllBikeTestsContext) {
    try {
      const bikeTests = await this.getBikeTestUseCase.executeAll();
      ctx.response.status = 200;
      ctx.response.body = bikeTests;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  async getByUserId(ctx: RouterContext<"/bike-test/user/:user_id", { user_id: string }>) {
    try {
      const { user_id } = ctx.params;
      if (!user_id) ctx.throw(400, "ID de l'utilisateur requis");

      const bikeTests = await this.getBikeTestUseCase.getByUserId(user_id);
      ctx.response.status = 200;
      ctx.response.body = bikeTests;
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  async update(ctx: UpdateBikeTestContext) {
    try {
      const { id } = ctx.params;
      const body = await ctx.request.body({ type: "json" }).value;
      if (!id || !body) ctx.throw(400, "Données invalides");

      const updatedBikeTest = await this.updateBikeTestUseCase.execute(id, body);
      ctx.response.status = 200;
      ctx.response.body = { message: "Test de moto mis à jour", updatedBikeTest };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  async delete(ctx: DeleteBikeTestContext) {
    try {
      const { id } = ctx.params;
      if (!id) ctx.throw(400, "ID du test de moto requis");

      await this.deleteBikeTestUseCase.execute(id);
      ctx.response.status = 200;
      ctx.response.body = { message: "Test de moto supprimé" };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  async accept(ctx: AcceptBikeTestContext) {
    try {
      const { id } = ctx.params;
      if (!id) ctx.throw(400, "ID du test de moto requis");

      await this.acceptBikeTestUseCase.execute(id);
      ctx.response.status = 200;
      ctx.response.body = { message: "Test de moto accepté avec succès" };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
