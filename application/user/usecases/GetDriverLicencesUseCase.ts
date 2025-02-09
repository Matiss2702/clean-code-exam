import { DriverLicenceRepository } from "../../../domain/repositories/DriverLicenceRepository.ts";
import { DriverLicenceDTO } from "../dto/DriverLicenceDTO.ts";

export class GetDriverLicencesUseCase {
  constructor(private repository: DriverLicenceRepository) {}

  async execute(userId: string): Promise<DriverLicenceDTO[]> {
    const licences = await this.repository.getByUserId(userId);

    return licences.map((licence) => ({
      id: licence.id,
      lastName: licence.lastName,
      firstName: licence.firstName,
      issueDate: licence.issueDate.toISOString().split("T")[0],
      expirationDate: licence.expirationDate.toISOString().split("T")[0],
      licenceNumber: licence.licenceNumber,
      userId: licence.userId,
      categories: [], // Ajout temporaire (si les catégories sont gérées ailleurs)
    }));
  }
}
