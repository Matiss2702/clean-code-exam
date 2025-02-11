import { LicenceCategoryRepository } from "@domain/repositories/LicenceCategoryRepository.ts";
import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

export class GetLicenceCategoryUseCase {
  constructor(private licenceCategoryRepository: LicenceCategoryRepository) {}

  async execute(id: string): Promise<LicenceCategory | null> {
    if (!id) {
      throw new Error("L'ID de la catégorie est requis.");
    }

    return await this.licenceCategoryRepository.getById(id);
  }
}
