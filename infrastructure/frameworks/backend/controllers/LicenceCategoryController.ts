import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateLicenceCategoryUseCase } from "@application/user/usecases/CreateLicenceCategoryUseCase.ts";
import { GetLicenceCategoryUseCase } from "@application/user/usecases/GetLicenceCategoryUseCase.ts";
import { GetAllLicenceCategoriesUseCase } from "@application/user/usecases/GetAllLicenceCategoriesUseCase.ts";
import { UpdateLicenceCategoryUseCase } from "@application/user/usecases/UpdateLicenceCategoryUseCase.ts";
import { DeleteLicenceCategoryUseCase } from "@application/user/usecases/DeleteLicenceCategoryUseCase.ts";
import { LicenceCategoryDTO } from "@application/user/dto/LicenceCategoryDTO.ts";

// Définition des types de contexte pour les routes
type CreateLicenceCategoryContext = RouterContext<"/licence-category">;
type GetLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;
type GetAllLicenceCategoriesContext = RouterContext<"/licence-category">;
type UpdateLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;
type DeleteLicenceCategoryContext = RouterContext<"/licence-category/:id", { id: string }>;

export class LicenceCategoryController {
  constructor(
    private createLicenceCategoryUC: CreateLicenceCategoryUseCase,
    private getLicenceCategoryUC: GetLicenceCategoryUseCase,
    private getAllLicenceCategoriesUC: GetAllLicenceCategoriesUseCase,
    private updateLicenceCategoryUC: UpdateLicenceCategoryUseCase,
    private deleteLicenceCategoryUC: DeleteLicenceCategoryUseCase
  ) {}

  /**
   * 🚀 Création d'une catégorie de permis
   */
  public async createLicenceCategory(ctx: CreateLicenceCategoryContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      const { name, transmissionType } = await body.value;

      if (!name) {
        ctx.throw(400, "Le nom est requis.");
      }

      console.log("📌 Données envoyées au UseCase :", { name, transmissionType });

      // Appel du use case avec les arguments attendus
      const category = await this.createLicenceCategoryUC.execute(name, transmissionType);

      ctx.response.status = 201;
      ctx.response.body = { message: "Catégorie de permis créée avec succès", category };
    } catch (error) {
      console.error("❌ Erreur lors de la création de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: error instanceof Error ? error.message : "Erreur inconnue" };
    }
  }

  /**
   * 🚀 Récupération d'une catégorie de permis par ID
   */
  public async getLicenceCategory(ctx: GetLicenceCategoryContext) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.throw(400, "ID de la catégorie requis.");
      }

      console.log(`🔍 Récupération de la catégorie ID: ${id}`);

      const category = await this.getLicenceCategoryUC.execute(id);
      if (!category) {
        ctx.throw(404, "Catégorie non trouvée.");
      }

      ctx.response.status = 200;
      ctx.response.body = category;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: error instanceof Error ? error.message : "Erreur inconnue" };
    }
  }

  /**
   * 🚀 Récupération de toutes les catégories de permis
   */
  public async getAllLicenceCategories(ctx: GetAllLicenceCategoriesContext) {
    try {
      console.log("🔍 Récupération de toutes les catégories");

      const categories = await this.getAllLicenceCategoriesUC.execute();

      ctx.response.status = 200;
      ctx.response.body = categories;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des catégories :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: error instanceof Error ? error.message : "Erreur inconnue" };
    }
  }

  /**
   * 🚀 Mise à jour d'une catégorie de permis
   */
  public async updateLicenceCategory(ctx: UpdateLicenceCategoryContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const categoryData: Partial<LicenceCategoryDTO> = await body.value;

      console.log(`🔄 Mise à jour de la catégorie ID: ${id}`, categoryData);

      if (!id || !categoryData) {
        ctx.throw(400, "ID et données de la catégorie requis.");
      }

      const updatedCategory = await this.updateLicenceCategoryUC.execute({
        id,
        name: categoryData.name ?? "",
        transmissionType: categoryData.transmissionType ?? "manuelle",
      });

      ctx.response.status = 200;
      ctx.response.body = { message: "Catégorie mise à jour avec succès", category: updatedCategory };
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: error instanceof Error ? error.message : "Erreur inconnue" };
    }
  }

  /**
   * 🚀 Suppression d'une catégorie de permis
   */
  public async deleteLicenceCategory(ctx: DeleteLicenceCategoryContext) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.throw(400, "ID de la catégorie requis.");
      }

      console.log(`🗑 Suppression de la catégorie ID: ${id}`);

      await this.deleteLicenceCategoryUC.execute(id);
      ctx.response.status = 204; // 204 No Content ne renvoie pas de body
    } catch (error) {
      console.error("❌ Erreur lors de la suppression de la catégorie :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: error instanceof Error ? error.message : "Erreur inconnue" };
    }
  }
}
