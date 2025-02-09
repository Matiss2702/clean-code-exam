import { LicenceCategoryDTO } from "../dto/LicenceCategoryDTO.ts";
import { LicenceCategoryRepository } from "@domain/repositories/LicenceCategoryRepository.ts";
import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

export class CreateLicenceCategoriesUseCase {
  constructor(private repo: LicenceCategoryRepository) {}

  async execute(data: LicenceCategoryDTO): Promise<LicenceCategory> {
    if (!data.name) {
      throw new Error("Le nom de la catégorie est requis.");
    }

    const newCategory = new LicenceCategory(data.id, data.name, data.transmission_type);
    return await this.repo.create(newCategory);
  }
}
