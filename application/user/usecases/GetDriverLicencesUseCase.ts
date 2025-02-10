// application/user/usecases/GetDriverLicencesUseCase.ts
import { DriverLicenceRepository } from "@domain/repositories/DriverLicenceRepository.ts";
import { DriverLicenceDTO } from "../dto/DriverLicenceDTO.ts";

export class GetDriverLicencesUseCase {
  constructor(private repository: DriverLicenceRepository) {}

  async execute(userId: string): Promise<DriverLicenceDTO[]> {
    // Récupération des permis (sans les catégories)
    const licences = await this.repository.getByUserId(userId);

    // Pour chaque permis, on récupère les catégories associées
    const results: DriverLicenceDTO[] = await Promise.all(
      licences.map(async (licence) => {
        // Récupérer les catégories associées depuis la table pivot
        const cats = await this.repository.getCategories(licence.id);
        // Mappez les catégories dans le format attendu par le DTO
        const catDTOs = cats.map((cat) => ({
          id: cat.id,
          name: cat.name,
          transmission_type: cat.transmission_type,
        }));

        return {
          id: licence.id,
          lastName: licence.lastName,
          firstName: licence.firstName,
          issueDate: licence.issueDate.toISOString().split("T")[0],
          expirationDate: licence.expirationDate.toISOString().split("T")[0],
          licenceNumber: licence.licenceNumber,
          userId: licence.userId,
          categories: catDTOs,
        };
      })
    );

    return results;
  }
}
