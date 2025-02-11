import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateBikePieceUseCase } from "@application/bikePiece/usecases/CreateBikePieceUseCase.ts";
import { GetBikePieceUseCase } from "@application/bikePiece/usecases/GetBikePieceUseCase.ts";
import { UpdateBikePieceUseCase } from "@application/bikePiece/usecases/UpdateBikePieceUseCase.ts";
import { DeleteBikePieceUseCase } from "@application/bikePiece/usecases/DeleteBikePieceUseCase.ts";

// Define specific context types
type CreateBikePieceContext = RouterContext<"/bike-piece">;
type GetBikePieceContext = RouterContext<"/bike-piece/:id", { id: string }>;
type GetBikePieceByReferenceContext = RouterContext<"/bike-piece/reference/:reference", { reference: string }>;
type GetBikePieceByBikeIdContext = RouterContext<"/bike-piece/bike/:bikeId", { bikeId: string }>;
type UpdateBikePieceContext = RouterContext<"/bike-piece/:id", { id: string }>;
type DeleteBikePieceContext = RouterContext<"/bike-piece/:id", { id: string }>;

// BikePieceController
export class BikePieceController {
  constructor(
    private createBikePieceUC: CreateBikePieceUseCase,
    private getBikePieceUC: GetBikePieceUseCase,
    private updateBikePieceUC: UpdateBikePieceUseCase,
    private deleteBikePieceUC: DeleteBikePieceUseCase
  ) {}

  /**
   * Création d'une pièce de moto
   */
  public async createBikePiece(ctx: CreateBikePieceContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      if (!body.value) {
        ctx.throw(400, "Le corps de la requête est vide ou mal formé.");
      }

      const { name, reference, price, maintenance_period_alert, stock, stock_alert, bike_id } = await body.value;

      if (!name || !reference || !bike_id) {
        ctx.throw(400, "Les champs 'name', 'reference' et 'bike_id' sont requis.");
      }

      const bikePiece = await this.createBikePieceUC.execute(name, reference, price, maintenance_period_alert, stock, stock_alert, bike_id);
      ctx.response.status = 201;
      ctx.response.body = { message: "Pièce de moto créée avec succès", bikePiece };
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      ctx.response.status = error.status || 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'une pièce de moto par ID
   */
  public async getBikePiece(ctx: GetBikePieceContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID de la pièce de moto requis.");
      }

      const bikePiece = await this.getBikePieceUC.execute(id);

      if (!bikePiece) {
        ctx.throw(404, "Pièce de moto non trouvée.");
      }

      ctx.response.status = 200;
      ctx.response.body = bikePiece;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'une pièce de moto par référence
   */
  async getBikePieceByReference(ctx: GetBikePieceByReferenceContext) {
    const { reference } = ctx.params;
    const bikePiece = await this.getBikePieceUC.getByReference(reference);

    if (bikePiece) {
      ctx.response.status = 200;
      ctx.response.body = bikePiece;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Pièce de moto non trouvée" };
    }
  }

  /**
   * Récupération de toutes les pièces de moto
   */
  public async getAllBikePieces(ctx: RouterContext) {
    try {
      console.log("Récupération de toutes les pièces de moto via controller...");
      const bikePieces = await this.getBikePieceUC.getAll();
      ctx.response.status = 200;
      ctx.response.body = bikePieces;
    } catch (error) {
      console.error("Erreur lors de la récupération des pièces de moto :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Mise à jour d'une pièce de moto
   */
  public async updateBikePiece(ctx: UpdateBikePieceContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const { name, reference, price, maintenance_period_alert, stock, stock_alert, bike_id } = await body.value;

      if (!name || !reference || !price || !bike_id) {
        ctx.throw(400, "Tous les champs de la pièce sont requis.");
      }

      const updatedBikePiece = await this.updateBikePieceUC.execute(id, name, reference, price, maintenance_period_alert, stock, stock_alert, bike_id);
      ctx.response.status = 200;
      ctx.response.body = { message: "Pièce de moto mise à jour avec succès", updatedBikePiece };
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Suppression d'une pièce de moto
   */
  public async deleteBikePiece(ctx: DeleteBikePieceContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "L'ID de la pièce de moto est requis.");
      }

      await this.deleteBikePieceUC.execute(id);
      ctx.response.status = 204;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
