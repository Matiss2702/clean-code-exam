import { BikeTestRepository } from "@domain/repositories/BikeTestRepository.ts";

export class DeleteBikeTestUseCase {
  constructor(private bikeTestRepository: BikeTestRepository) {}

  async execute(id: string): Promise<void> {
    const existingBikeTest = await this.bikeTestRepository.findById(id);
    if (!existingBikeTest) {
      throw new Error("Test de moto non trouvé.");
    }

    await this.bikeTestRepository.delete(id);
  }
}
