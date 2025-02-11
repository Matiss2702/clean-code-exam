import { BikeStatusRepository } from "@domain/repositories/BikeStatusRepository.ts";
import { BikeStatus } from "@domain/entities/BikeStatus.ts";

export class GetBikeStatusUseCase {
  constructor(private bikeStatusRepository: BikeStatusRepository) {}

  // Récupère un état de moto par ID
  async execute(id: string): Promise<BikeStatus | null> {
    if (!id) {
      throw new Error("L'ID de l'état de la moto est requis.");
    }

    return await this.bikeStatusRepository.findById(id);
  }

  // Récupère tous les états des motos
  async getAll(): Promise<BikeStatus[]> {
    return await this.bikeStatusRepository.findAll();
  }

  // Récupère un état de moto par nom
  async getByName(name: string): Promise<BikeStatus | null> {
    if (!name || name.trim().length === 0) {
      throw new Error("Le nom de l'état de la moto est requis.");
    }

    return await this.bikeStatusRepository.findByName(name.trim());
  }
}
