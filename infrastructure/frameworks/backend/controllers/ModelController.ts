import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateModelUseCase } from "@application/model/usecases/CreateModelUseCase.ts";
import { GetModelUseCase } from "@application/model/usecases/GetModelUseCase.ts";

type CreateModelContext = RouterContext<"/model">;
type GetModelContext = RouterContext<"/model/:id", { id: string }>;
type GetModelByLinkContext = RouterContext<"/model/model/:link", { link: string }>;
type UpdateModelContext = RouterContext<"/model/:id", { id: string }>;
type DeleteModelContext = RouterContext<"/model/:id", { id: string }>;

export class ModelController {
  constructor(
    private createModelUC: CreateModelUseCase,
    private getModelUC: GetModelUseCase
  ) {}

  /**
   * Création d'un modèle
   */
  public async createModel(ctx: CreateModelContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      if (!body.value) {
        ctx.throw(400, "Le corps de la requête est vide ou mal formé.");
      }
  
      const {
        name,
        maintenance_mileage_alert,
        maintenance_period_alert,
        top_case,
        seat,
        transmission_type,
        brand_id,
        bike_category_id,
      } = await body.value;
  
      if (!name) {
        ctx.throw(400, "Le champ 'name' est requis.");
      }
      if (!maintenance_mileage_alert || !maintenance_period_alert) {
        ctx.throw(400, "Les alertes de maintenance sont requises.");
      }

      const model = await this.createModelUC.execute(
        name,
        maintenance_mileage_alert,
        maintenance_period_alert,
        top_case,
        seat,
        transmission_type,
        brand_id,
        bike_category_id
      );
  
      ctx.response.status = 201;
      ctx.response.body = { message: "Modèle créé avec succès", model };
    } catch (error) {
      console.error("Erreur lors de la création du modèle :", error);
      ctx.response.status = error.status || 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'un modèle par ID
   */
  public async getModel(ctx: GetModelContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID du modèle requis.");
      }

      const model = await this.getModelUC.execute(id);

      if (!model) {
        ctx.throw(404, "Modèle non trouvé.");
      }

      ctx.response.status = 200;
      ctx.response.body = model;
    } catch (error) {
      console.error("Erreur lors de la récupération du modèle :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'un modèle par nom
   */
  async getModelByName(ctx: GetModelContext) {
    const { name } = ctx.params;
    const model = await this.getModelUC.getByName(name);

    if (model) {
      ctx.response.status = 200;
      ctx.response.body = model;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Modèle non trouvé" };
    }
  }

  /**
   * Récupération d'un modèle par lien
   */
  async getModelByLink(ctx: GetModelByLinkContext) {
    const { link } = ctx.params;
    const model = await this.getModelUC.getByLink(link);

    if (model) {
      ctx.response.status = 200;
      ctx.response.body = model;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Modèle non trouvé" };
    }
  }

  /**
   * Récupération de tous les modèles
   */
  public async getAllModels(ctx: RouterContext) {
    try {
      const models = await this.getModelUC.getAll();
      ctx.response.status = 200;
      ctx.response.body = models;
    } catch (error) {
      console.error("Erreur lors de la récupération des modèles :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Mise à jour d'un modèle
   */
  public async updateModel(ctx: UpdateModelContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const {
        name,
        maintenance_mileage_alert,
        maintenance_period_alert,
        top_case,
        seat,
        transmission_type,
        brand_id,
        bike_category_id,
      } = await body.value;

      if ((!id) || (!name) || (!maintenance_mileage_alert) || (!maintenance_period_alert)) {
        ctx.throw(400, "Tous les champs du modèle sont requis.");
      }
      
      const updatedModel = await this.createModelUC.update(
        id,
        name,
        maintenance_mileage_alert,
        maintenance_period_alert,
        top_case,
        seat,
        transmission_type,
        brand_id,
        bike_category_id
      );
  
      ctx.response.status = 200;
      ctx.response.body = { message: "Modèle mis à jour avec succès", updatedModel };
    } catch (error) {
      console.error("Erreur lors de la mise à jour du modèle :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Suppression d'un modèle
   */
  public async deleteModel(ctx: DeleteModelContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID du modèle requis.");
      }

      await this.createModelUC.delete(id);
      ctx.response.status = 204;
    } catch (error) {
      console.error("Erreur lors de la suppression du modèle :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}