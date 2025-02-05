import { BrandRepository } from "@domain/repositories/BrandRepository.ts";
import { Brand } from "@domain/entities/Brand.ts";

export class GetBrandUseCase {
  constructor(private brandRepository: BrandRepository) {}

  async execute(id: string): Promise<Brand | null> {
    if (!id) {
      throw new Error("L'ID de la marque est requis.");
    }

    return await this.brandRepository.findById(id);
  }

  async getAll(): Promise<Brand[]> {
    return await this.brandRepository.findAll();
  }

  async getByName(name: string): Promise<Brand | null> {
    if (!name || name.trim().length === 0) {
      throw new Error("Le nom de la marque est requis.");
    }

    return await this.brandRepository.findByName(name.trim());
  }

  async getByLink(link: string): Promise<Brand | null> {
    if (!link || link.trim().length === 0) {
      throw new Error("Le nom de la marque est requis.");
    }

    return await this.brandRepository.findByLink(link.trim());
  }
}
