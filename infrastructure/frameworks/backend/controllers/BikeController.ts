import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateBikeUseCase } from "@application/bike/usecases/CreateBikeUseCase.ts";
import { GetBikeUseCase } from "@application/bike/usecases/GetBikeUseCase.ts";

// Define specific context types
type CreateBikeContext = RouterContext<"/bike">;
type GetBikeContext = RouterContext<"/bike/:id", { id: string }>;
type GetBikeBySerialNumberContext = RouterContext<"/bike/serial/:serialNumber", { serialNumber: string }>;
type GetBikeByPlateNumberContext = RouterContext<"/bike/plate/:plateNumber", { plateNumber: string }>;
type UpdateBikeContext = RouterContext<"/bike/:id", { id: string }>;
type DeleteBikeContext = RouterContext<"/bike/:id", { id: string }>;

// BikeController
export class BikeController {
  constructor(
    private createBikeUC: CreateBikeUseCase,
    private getBikeUC: GetBikeUseCase
  ) {}

  /**
   * Création d'une moto
   */
  public async createBike(ctx: CreateBikeContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      if (!body.value) {
        ctx.throw(400, "Le corps de la requête est vide ou mal formé.");
      }

      const { purchase_date, serial_number, mileage, plate_number, production_batch_id, bike_status_id, model_id } = await body.value;

      if (!serial_number || !plate_number) {
        ctx.throw(400, "Les champs 'serial_number' et 'plate_number' sont requis.");
      }

      const bike = await this.createBikeUC.execute(purchase_date, serial_number, mileage, plate_number, production_batch_id, bike_status_id, model_id);
      ctx.response.status = 201;
      ctx.response.body = { message: "Moto créée avec succès", bike };
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      ctx.response.status = error.status || 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'une moto par ID
   */
  public async getBike(ctx: GetBikeContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID de la moto requis.");
      }

      const bike = await this.getBikeUC.execute(id);

      if (!bike) {
        ctx.throw(404, "Moto non trouvée.");
      }

      ctx.response.status = 200;
      ctx.response.body = bike;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'une moto par numéro de série
   */
  async getBikeBySerialNumber(ctx: GetBikeBySerialNumberContext) {
    const { serialNumber } = ctx.params;
    const bike = await this.getBikeUC.getBySerialNumber(serialNumber);

    if (bike) {
      ctx.response.status = 200;
      ctx.response.body = bike;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Moto non trouvée" };
    }
  }

  /**
   * Récupération d'une moto par numéro de plaque
   */
  async getBikeByPlateNumber(ctx: GetBikeByPlateNumberContext) {
    const { plateNumber } = ctx.params;
    const bike = await this.getBikeUC.getByPlateNumber(plateNumber);

    if (bike) {
      ctx.response.status = 200;
      ctx.response.body = bike;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Moto non trouvée" };
    }
  }

  /**
   * Récupération de toutes les motos
   */
  public async getAllBikes(ctx: RouterContext) {
    try {
      const bikes = await this.getBikeUC.getAll();
      ctx.response.status = 200;
      ctx.response.body = bikes;
    } catch (error) {
      console.error("Erreur lors de la récupération des motos :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Mise à jour d'une moto
   */
  public async updateBike(ctx: UpdateBikeContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const { serial_number, mileage, plate_number, bike_status_id, model_id, purchase_date } = await body.value;

      if (!serial_number || !plate_number || !mileage || !bike_status_id || !model_id || !purchase_date) {
        ctx.throw(400, "Tous les champs de la moto sont requis.");
      }

      console.log("purchase_date:", purchase_date);

      const updatedBike = await this.createBikeUC.update(id, purchase_date, serial_number, mileage, plate_number, bike_status_id, model_id);
      ctx.response.status = 200;
      ctx.response.body = { message: "Moto mise à jour avec succès", updatedBike };
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Suppression d'une moto
   */
  public async deleteBike(ctx: DeleteBikeContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "L'ID de la moto est requis.");
      }

      await this.createBikeUC.delete(id);
      ctx.response.status = 204;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
