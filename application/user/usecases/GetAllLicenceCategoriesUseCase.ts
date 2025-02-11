import { LicenceCategoryRepository } from "@domain/repositories/LicenceCategoryRepository.ts";
import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";

export class GetAllLicenceCategoriesUseCase {
  constructor(private licenceCategoryRepository: LicenceCategoryRepository) {}

  async execute(): Promise<LicenceCategory[]> {
    return await this.licenceCategoryRepository.getAll();
  }
}
