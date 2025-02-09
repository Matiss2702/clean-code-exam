import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { CreateDriverLicenceUseCase } from "@application/user/usecases/CreateDriverLicenceUseCase.ts";
import { GetDriverLicencesUseCase } from "@application/user/usecases/GetDriverLicencesUseCase.ts";
import { UpdateDriverLicenceUseCase } from "@application/user/usecases/UpdateDriverLicenceUseCase.ts";
import { DeleteDriverLicenceUseCase } from "@application/user/usecases/DeleteDriverLicenceUseCase.ts";
import { GetUserUseCase } from "@application/user/usecases/GetUserUseCase.ts";
import { DriverLicenceCreateDTO } from "@application/user/dto/DriverLicenceCreateDTO.ts";

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
    private getUserUC: GetUserUseCase
  ) {}

  public async createDriverLicence(ctx: CreateDriverLicenceContext) {
    try {
      const body = ctx.request.body({ type: "json" });
      const inputData: DriverLicenceCreateDTO = await body.value;

      if (!inputData.userId || !inputData.licenceNumber || !inputData.issueDate || !inputData.expirationDate) {
        ctx.throw(400, "Tous les champs requis doivent être renseignés.");
      }

      // Générer un nouvel ID
      const id = crypto.randomUUID();

      // Récupérer l'utilisateur pour obtenir firstName et lastName
      const user = await this.getUserUC.execute(inputData.userId);
      if (!user) {
        ctx.throw(404, "Utilisateur non trouvé.");
      }
      const nameParts = user.name.trim().split(" ");
      const firstName = nameParts.shift() || "";
      const lastName = nameParts.join(" ") || "";

      // Construire le DTO complet pour la création
      const createDto: DriverLicenceCreateDTO = {
        id,
        userId: inputData.userId,
        licenceNumber: inputData.licenceNumber,
        issueDate: inputData.issueDate,
        expirationDate: inputData.expirationDate,
        firstName,
        lastName,
        categories: inputData.categories ?? [],
      };

      console.log("📌 Données envoyées au UseCase (create) :", createDto);
      const licence = await this.createDriverLicenceUC.execute(createDto);

      ctx.response.status = 201;
      ctx.response.body = { message: "Permis de conduire créé avec succès", licence };
    } catch (error) {
      console.error("❌ Erreur lors de la création du permis :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

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

  public async updateDriverLicence(ctx: UpdateDriverLicenceContext) {
    try {
      const { id } = ctx.params;
      const body = ctx.request.body({ type: "json" });
      const inputData: Partial<DriverLicenceCreateDTO> = await body.value;
      if (!id) {
        ctx.throw(400, "ID requis pour la mise à jour.");
      }

      const updateDto: DriverLicenceCreateDTO = {
        id,
        lastName: inputData.lastName ?? "",
        firstName: inputData.firstName ?? "",
        issueDate: inputData.issueDate ?? "",
        expirationDate: inputData.expirationDate ?? "",
        licenceNumber: inputData.licenceNumber ?? "",
        userId: inputData.userId ?? "",
        categories: inputData.categories ?? [],
      };

      console.log("📌 Données envoyées au UseCase (update) :", updateDto);
      const updatedLicence = await this.updateDriverLicenceUC.execute(updateDto);

      ctx.response.status = 200;
      ctx.response.body = { message: "Permis mis à jour avec succès", licence: updatedLicence };
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du permis :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }

  public async deleteDriverLicence(ctx: DeleteDriverLicenceContext) {
    try {
      const { id } = ctx.params;
      if (!id) {
        ctx.throw(400, "ID requis pour la suppression.");
      }
      console.log(`🗑 Suppression du permis ID: ${id}`);
      await this.deleteDriverLicenceUC.execute(id);
      ctx.response.status = 204;
    } catch (error) {
      console.error("❌ Erreur lors de la suppression du permis :", error);
      ctx.response.status = 400;
      ctx.response.body = { error: (error as Error).message };
    }
  }
}
