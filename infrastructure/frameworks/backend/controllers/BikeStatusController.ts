import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateBikeStatusUseCase } from "@application/bikeStatus/usecases/CreateBikeStatusUseCase.ts";
import { GetBikeStatusUseCase } from "@application/bikeStatus/usecases/GetBikeStatutsUseCase.ts";

// Define specific context types
type CreateBikeStatusContext = RouterContext<"/bike-status">;
type GetBikeStatusContext = RouterContext<"/bike-status/:id", { id: string }>;
type GetBikeStatusByNameContext = RouterContext<"/bike-status/name/:name", { name: string }>;
type UpdateBikeStatusContext = RouterContext<"/bike-status/:id", { id: string }>;
type DeleteBikeStatusContext = RouterContext<"/bike-status/:id", { id: string }>;

// BikeStatusController
export class BikeStatusController {
  constructor(
    private createBikeStatusUC: CreateBikeStatusUseCase,
    private getBikeStatusUC: GetBikeStatusUseCase
  ) {}

  /**
   * Création d'un état de moto
   */
  public async createBikeStatus(ctx: CreateBikeStatusContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      if (!body.value) {
        ctx.throw(400, "Le corps de la requête est vide ou mal formé.");
      }

      const { name } = await body.value;

      if (!name) {
        ctx.throw(400, "Le champ 'name' est requis.");
      }

      const bikeStatus = await this.createBikeStatusUC.execute(name);
      ctx.response.status = 201;
      ctx.response.body = { message: "État de moto créé avec succès", bikeStatus };
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      ctx.response.status = error.status || 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'un état de moto par ID
   */
  public async getBikeStatus(ctx: GetBikeStatusContext) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.throw(400, "ID de l'état de moto requis.");
      }

      const bikeStatus = await this.getBikeStatusUC.execute(id);
      if (!bikeStatus) {
        ctx.throw(404, "État de moto non trouvé.");
      }

      ctx.response.status = 200;
      ctx.response.body = bikeStatus;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération de toutes les catégories de motos
   */
  public async getAllBikeStatus(ctx: RouterContext) {
    try {
      const bikeStatuses = await this.getBikeStatusUC.getAll();
      ctx.response.status = 200;
      ctx.response.body = bikeStatuses;
    } catch (error) {
      console.error("Erreur lors de la récupération des états de motos :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'un état de moto par nom
   */
  async getBikeStatusByName(ctx: GetBikeStatusByNameContext) {
    const { name } = ctx.params;
    const bikeStatus = await this.getBikeStatusUC.getByName(name);

    if (bikeStatus) {
      ctx.response.status = 200;
      ctx.response.body = bikeStatus;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "État de moto non trouvé" };
    }
  }

  /**
   * Mise à jour d'un état de moto
   */
  public async updateBikeStatus(ctx: UpdateBikeStatusContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const { name } = await body.value;

      if (!name) {
        ctx.throw(400, "Le champ 'name' est requis.");
      }

      const updatedBikeStatus = await this.createBikeStatusUC.update(id, name);
      ctx.response.status = 200;
      ctx.response.body = { message: "État de moto mis à jour avec succès", updatedBikeStatus };
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Suppression d'un état de moto
   */
  public async deleteBikeStatus(ctx: DeleteBikeStatusContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID de l'état de moto requis.");
      }

      await this.createBikeStatusUC.delete(id);
      ctx.response.status = 204;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
