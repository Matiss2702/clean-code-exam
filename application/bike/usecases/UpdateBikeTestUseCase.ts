import { BikeTestDTO } from "@application/bike/dto/BikeTestDTO.ts";
import { BikeTestRepository } from "@domain/repositories/BikeTestRepository.ts";

export class UpdateBikeTestUseCase {
  constructor(private bikeTestRepository: BikeTestRepository) {}

  async execute(id: string, data: Partial<BikeTestDTO>) {
    const existingBikeTest = await this.bikeTestRepository.findById(id);
    if (!existingBikeTest) {
      throw new Error("Test de moto non trouvé.");
    }

    const updatedBikeTest = {
      ...existingBikeTest,
      ...data,
    };

    return await this.bikeTestRepository.update(updatedBikeTest);
  }
}
