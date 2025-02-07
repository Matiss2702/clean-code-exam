import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateBrandUseCase } from "@application/brand/usecases/CreateBrandUseCase.ts";
import { GetBrandUseCase } from "@application/brand/usecases/GetBrandUseCase.ts";

// Define specific context types
type CreateBrandContext = RouterContext<"/brands">;
type GetBrandContext = RouterContext<"/brands/:id", { id: string }>;
type GetBrandByLinkContext = RouterContext<"/brands/brand/:link", { link: string }>;
type UpdateBrandContext = RouterContext<"/brands/:id", { id: string }>;
type DeleteBrandContext = RouterContext<"/brands/:id", { id: string }>;

export class BrandController {
  constructor(
    private createBrandUC: CreateBrandUseCase,
    private getBrandUC: GetBrandUseCase
  ) {}

  /**
   * Création d'une marque
   */
  public async createBrand(ctx: CreateBrandContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      if (!body.value) {
        ctx.throw(400, "Le corps de la requête est vide ou mal formé.");
      }
  
      const { name, description } = await body.value;
  
      if (!name) {
        ctx.throw(400, "Le champ 'name' est requis.");
      }

      if (!description) {
        ctx.throw(400, "Le champ 'description' est requis.");
      }
  
      const brand = await this.createBrandUC.execute(name, description);
      ctx.response.status = 201;
      ctx.response.body = { message: "Marque créée avec succès", brand };
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      ctx.response.status = error.status || 500;
      ctx.response.body = { error: (error as Error).message };
    }
  }
  
  /**
   * Récupération d'une marque par ID
   */
  public async getBrand(ctx: GetBrandContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID de la marque requis.");
      }

      const brand = await this.getBrandUC.execute(id);

      if (!brand) {
        ctx.throw(404, "Marque non trouvée.");
      }

      ctx.response.status = 200;
      ctx.response.body = brand;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Récupération d'une marque par nom
   */
  async getBrandByName(ctx: GetBrandContext) {
    const { name } = ctx.params;
    const brand = await this.getBrandUC.getByName(name);

    if (brand) {
      ctx.response.status = 200;
      ctx.response.body = brand;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Brand not found" };
    }
  }

  /**
 * Récupération d'une marque par lien
 */
  async getBrandByLink(ctx: GetBrandByLinkContext) {
    const { link } = ctx.params;
    console.log("controler link :", link)
    const brand = await this.getBrandUC.getByLink(link);

    if (brand) {
      ctx.response.status = 200;
      ctx.response.body = brand;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Brand not found" };
    }
  }

  /**
   * Récupération de toutes les marques
   */
  public async getAllBrands(ctx: RouterContext) {
    try {
      const brands = await this.getBrandUC.getAll();
      ctx.response.status = 200;
      ctx.response.body = brands;
    } catch (error) {
      console.error("Erreur lors de la récupération des marques :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Mise à jour d'une marque
   */
  public async updateBrand(ctx: UpdateBrandContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const { name, description } = await body.value;

      if ((!id) || (!name) || (!description)) {
        ctx.throw(400, "Tous les champs de la marque sont requis.");
      }
      
      const updatedBrand = await this.createBrandUC.update(id, name, description);
      ctx.response.status = 200;
      ctx.response.body = { message: "Marque mise à jour avec succès", updatedBrand };
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * Suppression d'une marque
   */
  public async deleteBrand(ctx: DeleteBrandContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "L'ID de la marque est requis.");
      }

      await this.createBrandUC.delete(id);
      ctx.response.status = 204;
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
