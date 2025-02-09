import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";
import { LicenceCategoryRepository } from "@domain/repositories/LicenceCategoryRepository.ts";

export class UpdateLicenceCategoryUseCase {
  constructor(private licenceCategoryRepository: LicenceCategoryRepository) {}

  async execute(category: LicenceCategory): Promise<LicenceCategory> {
    if (!category.id) {
      throw new Error("L'ID de la catégorie est requis pour la mise à jour.");
    }
    return await this.licenceCategoryRepository.update(category);
  }
}
