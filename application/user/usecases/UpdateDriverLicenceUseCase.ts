import { DriverLicenceRepository } from "@domain/repositories/DriverLicenceRepository.ts";
import { DriverLicenceCreateDTO } from "../dto/DriverLicenceCreateDTO.ts";
import { DriverLicence } from "@domain/entities/DriverLicence.ts";

export class UpdateDriverLicenceUseCase {
  constructor(private repository: DriverLicenceRepository) {}

  async execute(data: DriverLicenceCreateDTO): Promise<DriverLicence> {
    const licence: DriverLicence = {
      id: data.id ?? "",
      lastName: data.lastName,
      firstName: data.firstName,
      issueDate: new Date(data.issueDate),
      expirationDate: new Date(data.expirationDate),
      licenceNumber: data.licenceNumber,
      userId: data.userId,
    };

    const updated = await this.repository.update(licence);

    if (data.categories) {
      await this.repository.setCategories(updated.id, data.categories);
    }

    return updated;
  }
}
