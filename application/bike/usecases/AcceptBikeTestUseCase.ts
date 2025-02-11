import { BikeTestRepository } from "@domain/repositories/BikeTestRepository.ts";

export class AcceptBikeTestUseCase {
  constructor(private bikeTestRepository: BikeTestRepository) {}

  async execute(id: string): Promise<void> {
    const rental = await this.bikeTestRepository.findById(id);
    if (!rental) throw new Error("Location non trouvée");

    rental.is_accepted = true;
    await this.bikeTestRepository.update(rental);
  }
}
