import { BikeTestRepository } from "@domain/repositories/BikeTestRepository.ts";
import { BikeTest } from "@domain/entities/BikeTest.ts";

export class GetBikeTestUseCase {
  constructor(private bikeTestRepository: BikeTestRepository) {}

  async execute(id: string): Promise<BikeTest | null> {
    if (!id) {
      throw new Error("L'ID du test de moto est requis.");
    }
    return await this.bikeTestRepository.findById(id);
  }

  async executeAll(): Promise<BikeTest[]> {
    return await this.bikeTestRepository.findAll();
  }

  async getByUserId(userId: string): Promise<BikeTest[]> {
    if (!userId) {
      throw new Error("L'ID de l'utilisateur est requis.");
    }
    return await this.bikeTestRepository.findByUser(userId);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error("L'ID du test de moto est requis pour la suppression.");
    }
    await this.bikeTestRepository.delete(id);
  }
}
