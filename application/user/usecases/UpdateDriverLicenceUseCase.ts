import { DriverLicenceRepository } from "@domain/repositories/DriverLicenceRepository.ts";
import { DriverLicenceCreateDTO } from "../dto/DriverLicenceCreateDTO.ts";
import { DriverLicence } from "@domain/entities/DriverLicence.ts";

export class UpdateDriverLicenceUseCase {
  constructor(private repository: DriverLicenceRepository) {}

  async execute(data: DriverLicenceCreateDTO): Promise<DriverLicence> {
    // 1. Construire l'entité à mettre à jour
    const licence: DriverLicence = {
      id: data.id ?? "",
      lastName: data.lastName,
      firstName: data.firstName,
      issueDate: new Date(data.issueDate),
      expirationDate: new Date(data.expirationDate),
      licenceNumber: data.licenceNumber,
      userId: data.userId,
    };

    // 2. Mettre à jour la table driver_licence
    const updated = await this.repository.update(licence);

    // 3. Mettre à jour la table pivot pour les catégories, si fournies
    if (data.categories) {
      await this.repository.setCategories(updated.id, data.categories);
    }

    return updated;
  }
}
