import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateBikeCategoryUseCase } from "@application/bikeCategory/usecases/CreateBikeCategoryUseCase.ts";
import { GetBikeCategoryUseCase } from "@application/bikeCategory/usecases/GetBikeCategoryUseCase.ts";

// Define specific context types
type CreateBikeCategoryContext = RouterContext<"/bike-category">;
type GetBikeCategoryContext = RouterContext<"/bike-category/:id", { id: string }>;
type GetBikeCategoryByNameContext = RouterContext<"/bike-category/name/:name", { name: string }>;
type UpdateBikeCategoryContext = RouterContext<"/bike-category/:id", { id: string }>;
type DeleteBikeCategoryContext = RouterContext<"/bike-category/:id", { id: string }>;

// BikeCategoryController
export class BikeCategoryController {
  constructor(
    private createBikeCategoryUC: CreateBikeCategoryUseCase,
    private getBikeCategoryUC: GetBikeCategoryUseCase
  ) {}

  /**
   * Création d'une catégorie de moto
   */
  public async createBikeCategory(ctx: CreateBikeCategoryContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      if (!body.value) {
        ctx.throw(400, "Le corps de la requête est vide ou mal formé.");
      }

      const { name, minimum_age, minimum_experience } = await body.value;

      if (!name) {
        ctx.throw(400, "Le champ 'name' est requis.");
      }

      if (minimum_age == null || minimum_experience == null) {
        ctx.throw(400, "Les champs 'minimum_age' et 'minimum_experience' sont requis.");
      }

      const bikeCategory = await this.createBikeCategoryUC.execute(name, minimum_age, minimum_experience);
      ctx.response.status = 201;
      ctx.response.body = { message: "Catégorie de moto créée avec succès", bikeCategory };
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      ctx.response.status = error.status || 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'une catégorie de moto par ID
   */
  public async getBikeCategory(ctx: GetBikeCategoryContext) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.throw(400, "ID de la catégorie de moto requis.");
      }

      const bikeCategory = await this.getBikeCategoryUC.execute(id);
      if (!bikeCategory) {
        ctx.throw(404, "Catégorie de moto non trouvée.");
      }

      ctx.response.status = 200;
      ctx.response.body = bikeCategory;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération de toutes les catégories de motos
   */
  public async getAllBikeCategories(ctx: RouterContext) {
    try {
      const bikeCategories = await this.getBikeCategoryUC.getAll();
      ctx.response.status = 200;
      ctx.response.body = bikeCategories;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories de motos :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'une catégorie de moto par nom
   */
  async getBikeCategoryByName(ctx: GetBikeCategoryByNameContext) {
    const { name } = ctx.params;
    const bikeCategory = await this.getBikeCategoryUC.getByName(name);

    if (bikeCategory) {
      ctx.response.status = 200;
      ctx.response.body = bikeCategory;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Catégorie de moto non trouvée" };
    }
  }

  /**
   * Mise à jour d'une catégorie de moto
   */
  public async updateBikeCategory(ctx: UpdateBikeCategoryContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const { name, minimum_age, minimum_experience } = await body.value;

      if (!name || minimum_age == null || minimum_experience == null) {
        ctx.throw(400, "Tous les champs de la catégorie de moto sont requis.");
      }

      const updatedBikeCategory = await this.createBikeCategoryUC.update(id, name, minimum_age, minimum_experience);
      ctx.response.status = 200;
      ctx.response.body = { message: "Catégorie de moto mise à jour avec succès", updatedBikeCategory };
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Suppression d'une catégorie de moto
   */
  public async deleteBikeCategory(ctx: DeleteBikeCategoryContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID de la catégorie de moto requis.");
      }

      await this.createBikeCategoryUC.delete(id);
      ctx.response.status = 204;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
