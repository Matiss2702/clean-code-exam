import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateLicenceCategoriesUseCase } from "@application/user/usecases/CreateLicenceCategoriesUseCase.ts";
import { GetLicenceCategoryUseCase } from "@application/user/usecases/GetLicenceCategoryUseCase.ts";
import { GetAllLicenceCategoriesUseCase } from "@application/user/usecases/GetAllLicenceCategoriesUseCase.ts";
import { UpdateLicenceCategoryUseCase } from "@application/user/usecases/UpdateLicenceCategoryUseCase.ts";
import { DeleteLicenceCategoryUseCase } from "@application/user/usecases/DeleteLicenceCategoryUseCase.ts";
import { LicenceCategoryDTO } from "@application/user/dto/LicenceCategoryDTO.ts";

// Types Oak pour chaque route
type CreateLicenceCategoryContext = RouterContext<"/licence-category">;
type GetLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;
type GetAllLicenceCategoriesContext = RouterContext<"/licence-category">;
type UpdateLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;
type DeleteLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;

export class LicenceCategoryController {
  constructor(
    private createLicenceCategoryUC: CreateLicenceCategoriesUseCase,
    private getLicenceCategoryUC: GetLicenceCategoryUseCase,
    private getAllLicenceCategoriesUC: GetAllLicenceCategoriesUseCase,
    private updateLicenceCategoryUC: UpdateLicenceCategoryUseCase,
    private deleteLicenceCategoryUC: DeleteLicenceCategoryUseCase
  ) {}

  /**
   * 🚀 POST /licence-category
   */
  public async createLicenceCategory(ctx: CreateLicenceCategoryContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      const { name, transmissionType } = await body.value;

      if (!name) {
        ctx.throw(400, "Le nom est requis.");
      }

      // Générer un UUID ici
      const id = crypto.randomUUID();

      // Construire le DTO
      const categoryData: LicenceCategoryDTO = {
        id,
        name,
        transmission_type: transmissionType ?? "manuelle",
      };

      console.log("📌 Données envoyées au UseCase :", categoryData);

      // Appel au use case
      const category = await this.createLicenceCategoryUC.execute(categoryData);

      ctx.response.status = 201;
      ctx.response.body = {
        message: "Catégorie de permis créée avec succès",
        category,
      };
    } catch (error) {
      console.error("❌ Erreur lors de la création de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = {
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  }

  /**
   * 🚀 GET /licence-category/:id
   */
  public async getLicenceCategory(ctx: GetLicenceCategoryContext) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.throw(400, "ID de la catégorie requis.");
      }

      const category = await this.getLicenceCategoryUC.execute(id);
      if (!category) {
        ctx.throw(404, "Catégorie non trouvée.");
      }

      ctx.response.status = 200;
      ctx.response.body = category;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = {
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  }

  /**
   * 🚀 GET /licence-category
   */
  public async getAllLicenceCategories(ctx: GetAllLicenceCategoriesContext) {
    try {
      const categories = await this.getAllLicenceCategoriesUC.execute();
      ctx.response.status = 200;
      ctx.response.body = categories;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des catégories :", error);
      ctx.response.status = 400;
      ctx.response.body = {
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  }

  /**
   * 🚀 PUT /licence-category/:id
   */
  public async updateLicenceCategory(ctx: UpdateLicenceCategoryContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const categoryData = await body.value; // { name: "xxx", transmission_type: "yyy" }

      if (!id || !categoryData) {
        ctx.throw(400, "ID et données de la catégorie requis.");
      }

      // On construit un objet LicenceCategory complet
      const updatedCategoryEntity = {
        id,
        name: categoryData.name ?? "",
        transmission_type: categoryData.transmission_type ?? "manuelle",
      };

      // Appel du use case
      const updatedCategory = await this.updateLicenceCategoryUC.execute(updatedCategoryEntity);

      ctx.response.status = 200;
      ctx.response.body = {
        message: "Catégorie mise à jour avec succès",
        category: updatedCategory,
      };
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = {
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  }

  /**
   * 🚀 DELETE /licence-category/:id
   */
  public async deleteLicenceCategory(ctx: DeleteLicenceCategoryContext) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.throw(400, "ID de la catégorie requis.");
      }

      await this.deleteLicenceCategoryUC.execute(id);
      ctx.response.status = 204; // No Content
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = {
        error: error instanceof Error ? error.message : "Erreur inconnue",
      };
    }
  }
}
