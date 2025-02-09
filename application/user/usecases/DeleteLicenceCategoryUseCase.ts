import { LicenceCategoryRepository } from "@domain/repositories/LicenceCategoryRepository.ts";

export class DeleteLicenceCategoryUseCase {
  constructor(private licenceCategoryRepository: LicenceCategoryRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("L'ID de la catégorie est requis pour la suppression.");
    }

    return await this.licenceCategoryRepository.delete(id);
  }
}
