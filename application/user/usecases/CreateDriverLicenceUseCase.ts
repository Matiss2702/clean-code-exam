import { DriverLicenceRepository } from "../../../domain/repositories/DriverLicenceRepository.ts";
import { DriverLicenceDTO } from "../dto/DriverLicenceDTO.ts";
import { DriverLicence } from "../../../domain/entities/DriverLicence.ts";

export class CreateDriverLicenceUseCase {
  constructor(private repository: DriverLicenceRepository) {}

  async execute(data: DriverLicenceDTO): Promise<DriverLicence> {
    // ⬅️ Maintenant, on retourne l'objet créé
    const licence: DriverLicence = {
      id: data.id ?? "",
      lastName: data.lastName,
      firstName: data.firstName,
      issueDate: new Date(data.issueDate),
      expirationDate: new Date(data.expirationDate),
      licenceNumber: data.licenceNumber,
      userId: data.userId,
    };

    return await this.repository.create(licence);
  }
}
