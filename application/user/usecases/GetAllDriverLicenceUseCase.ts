import { LicenceCategoryRepository } from "../../../domain/repositories/LicenceCategoryRepository.ts";
import { LicenceCategoryDTO } from "../dto/LicenceCategoryDTO.ts";

export class GetAllLicenceCategoriesUseCase {
  constructor(private repository: LicenceCategoryRepository) {}

  async execute(): Promise<LicenceCategoryDTO[]> {
    return await this.repository.getAll();
  }
}
