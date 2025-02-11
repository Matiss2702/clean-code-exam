import { BikeCategoryRepository } from "@domain/repositories/BikeCategoryRepository.ts";
import { BikeCategory } from "@domain/entities/BikeCategory.ts";

export class GetBikeCategoryUseCase {
  constructor(private bikeCategoryRepository: BikeCategoryRepository) {}

  // Récupère une catégorie de moto par ID
  async execute(id: string): Promise<BikeCategory | null> {
    if (!id) {
      throw new Error("L'ID de la catégorie de moto est requis.");
    }

    return await this.bikeCategoryRepository.findById(id);
  }

  // Récupère toutes les catégories de motos
  async getAll(): Promise<BikeCategory[]> {
    return await this.bikeCategoryRepository.findAll();
  }

  // Récupère une catégorie de moto par nom
  async getByName(name: string): Promise<BikeCategory | null> {
    if (!name || name.trim().length === 0) {
      throw new Error("Le nom de la catégorie de moto est requis.");
    }

    return await this.bikeCategoryRepository.findByName(name.trim());
  }
}
