import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateDriverLicenceUseCase } from "@application/user/usecases/CreateDriverLicenceUseCase.ts";
import { GetDriverLicencesUseCase } from "@application/user/usecases/GetDriverLicencesUseCase.ts";
import { UpdateDriverLicenceUseCase } from "@application/user/usecases/UpdateDriverLicenceUseCase.ts";
import { DeleteDriverLicenceUseCase } from "@application/user/usecases/DeleteDriverLicenceUseCase.ts";
import { GetUserUseCase } from "@application/user/usecases/GetUserUseCase.ts"; // ✅ Ajout de l'import
import { DriverLicenceDTO } from "@application/user/dto/DriverLicenceDTO.ts";

type CreateDriverLicenceContext = RouterContext<"/driver-licence">;
type GetDriverLicencesContext = RouterContext<"/driver-licence/:userId", { userId: string }>;
type UpdateDriverLicenceContext = RouterContext<"/driver-licence/:id", { id: string }>;
type DeleteDriverLicenceContext = RouterContext<"/driver-licence/:id", { id: string }>;

export class DriverLicenceController {
  constructor(
    private createDriverLicenceUC: CreateDriverLicenceUseCase,
    private getDriverLicencesUC: GetDriverLicencesUseCase,
    private updateDriverLicenceUC: UpdateDriverLicenceUseCase,
    private deleteDriverLicenceUC: DeleteDriverLicenceUseCase,
    private getUserUC: GetUserUseCase // ✅ Ajout de getUserUC
  ) {}

  /**
   * 🚀 Création d'un permis de conduire
   */
  public async createDriverLicence(ctx: CreateDriverLicenceContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      const { userId, licenceNumber, issueDate, expirationDate, points } = await body.value;

      if (!userId || !licenceNumber || !issueDate || !expirationDate) {
        ctx.throw(400, "Tous les champs sont requis.");
      }

      // ✅ Générer un ID unique pour le permis de conduire
      const id = crypto.randomUUID();

      // ✅ Récupérer l'utilisateur pour extraire firstName et lastName
      const user = await this.getUserUC.execute(userId);
      if (!user) {
        ctx.throw(404, "Utilisateur non trouvé.");
      }

      const nameParts = user.name.trim().split(" ");
      const firstName = nameParts.shift() || "";
      const lastName = nameParts.join(" ") || "";

      // ✅ Création de l'objet permis de conduire avec un ID valide
      const licenceData: DriverLicenceDTO = {
        id, // 🔥 Assigner un UUID généré ici
        userId,
        licenceNumber,
        issueDate,
        expirationDate,
        firstName,
        lastName,
      };

      console.log("📌 Données envoyées au UseCase :", licenceData);

      const licence = await this.createDriverLicenceUC.execute(licenceData);

      ctx.response.status = 201;
      ctx.response.body = { message: "Permis de conduire créé avec succès", licence };
    } catch (error) {
      console.error("❌ Erreur lors de la création du permis :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * 🚀 Récupération des permis d'un utilisateur
   */
  public async getDriverLicences(ctx: GetDriverLicencesContext) {
    try {
      const { userId } = ctx.params;

      if (!userId) {
        ctx.throw(400, "ID utilisateur requis.");
      }

      console.log(`🔍 Récupération des permis de l'utilisateur ID: ${userId}`);

      const licences = await this.getDriverLicencesUC.execute(userId);

      ctx.response.status = 200;
      ctx.response.body = licences;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des permis :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * 🚀 Mise à jour d'un permis de conduire
   */
  public async updateDriverLicence(ctx: UpdateDriverLicenceContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const licenceData: Partial<DriverLicenceDTO> = await body.value;

      console.log(`🔄 Mise à jour du permis ID: ${id}`, licenceData);

      if (!id || !licenceData) {
        ctx.throw(400, "ID et données du permis requis.");
      }

      const updatedLicence = await this.updateDriverLicenceUC.execute({
        id,
        lastName: licenceData.lastName ?? "",
        firstName: licenceData.firstName ?? "",
        issueDate: licenceData.issueDate ?? "",
        expirationDate: licenceData.expirationDate ?? "",
        licenceNumber: licenceData.licenceNumber ?? "",
        userId: licenceData.userId ?? "",
        categories: licenceData.categories ?? [],
      });

      ctx.response.status = 200;
      ctx.response.body = { message: "Permis mis à jour avec succès", licence: updatedLicence };
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du permis :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  /**
   * 🚀 Suppression d'un permis de conduire
   */
  public async deleteDriverLicence(ctx: DeleteDriverLicenceContext) {
    try {
      const { id } = ctx.params;

      if (!id) {
        ctx.throw(400, "ID permis requis.");
      }

      console.log(`🗑 Suppression du permis ID: ${id}`);

      await this.deleteDriverLicenceUC.execute(id);

      ctx.response.status = 204; // ✅ Aucun body envoyé avec un 204
    } catch (error) {
      console.error("❌ Erreur lors de la suppression du permis :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
