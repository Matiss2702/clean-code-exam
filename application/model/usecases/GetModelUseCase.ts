import { ModelRepository } from "@domain/repositories/ModelRepository.ts";
import { Model } from "@domain/entities/Model.ts";

export class GetModelUseCase {
  constructor(private modelRepository: ModelRepository) {}

  async execute(id: string): Promise<Model | null> {
    if (!id) {
      throw new Error("L'ID du modèle est requis.");
    }

    return await this.modelRepository.findById(id);
  }

  async getAll(): Promise<Model[]> {
    return await this.modelRepository.findAll();
  }

  async getByName(name: string): Promise<Model | null> {
    if (!name || name.trim().length === 0) {
      throw new Error("Le nom du modèle est requis.");
    }

    return await this.modelRepository.findByName(name.trim());
  }

  async getByLink(link: string): Promise<Model | null> {
    if (!link || link.trim().length === 0) {
      throw new Error("Le lien du modèle est requis.");
    }

    return await this.modelRepository.findByLink(link.trim());
  }

  async getByBrandId(brandId: string): Promise<Model[]> {
    if (!brandId) {
      throw new Error("L'ID de la marque est requis.");
    }

    return await this.modelRepository.findByBrandId(brandId);
  }

  async getByBikeCategoryId(bikeCategoryId: string): Promise<Model[]> {
    if (!bikeCategoryId) {
      throw new Error("L'ID de la catégorie de vélo est requis.");
    }

    return await this.modelRepository.findByBikeCategoryId(bikeCategoryId);
  }
}