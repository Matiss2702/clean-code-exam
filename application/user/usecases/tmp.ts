import { LicenceCategoryRepository } from "@domain/repositories/LicenceCategoryRepository.ts";
import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";
import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";

export class CreateLicenceCategoryUseCase {
  constructor(private licenceCategoryRepository: LicenceCategoryRepository, private uuidGenerator: UuidGenerator) {}

  async execute(name: string, transmissionType: "manuelle" | "automatique" = "manuelle"): Promise<LicenceCategory> {
    if (!name) {
      throw new Error("Le nom de la catégorie est requis.");
    }

    const newCategory = new LicenceCategory(this.uuidGenerator.generateUuid(), name, transmissionType);

    return await this.licenceCategoryRepository.create(newCategory);
  }
}
