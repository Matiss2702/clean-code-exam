import { DriverLicenceRepository } from "@domain/repositories/DriverLicenceRepository.ts";
import { DriverLicenceCreateDTO } from "@application/user/dto/DriverLicenceCreateDTO.ts";
import { DriverLicence } from "@domain/entities/DriverLicence.ts";

export class CreateDriverLicenceUseCase {
  constructor(private repository: DriverLicenceRepository) {}

  async execute(data: DriverLicenceCreateDTO): Promise<DriverLicence> {
    // 1. Construire l'entité DriverLicence
    const licence: DriverLicence = {
      id: data.id ?? crypto.randomUUID(),
      lastName: data.lastName,
      firstName: data.firstName,
      issueDate: new Date(data.issueDate),
      expirationDate: new Date(data.expirationDate),
      licenceNumber: data.licenceNumber,
      userId: data.userId,
    };

    // 2. Créer la ligne dans la table driver_licence
    const createdLicence = await this.repository.create(licence);

    // 3. Si des catégories sont fournies, mettre à jour la table pivot
    if (data.categories && data.categories.length > 0) {
      await this.repository.setCategories(createdLicence.id, data.categories);
    }

    return createdLicence;
  }
}
