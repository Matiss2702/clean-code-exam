import { BikeTestDTO } from "@application/bike/dto/BikeTestDTO.ts";
import { BikeTest } from "@domain/entities/BikeTest.ts";
import { BikeTestRepository } from "@domain/repositories/BikeTestRepository.ts";

export class CreateBikeTestUseCase {
  constructor(private bikeTestRepository: BikeTestRepository) {}

  async execute(data: BikeTestDTO): Promise<BikeTest> {
    if (!data.user_id || !data.bike_id || !data.started_at || !data.price) {
      throw new Error("Tous les champs obligatoires doivent être renseignés.");
    }

    const id = data.id ?? crypto.randomUUID();

    const bikeTest = new BikeTest(
      id,
      data.user_id,
      data.bike_id,
      data.started_at,
      data.ended_at ?? null,
      data.is_accepted ?? false,
      data.price
    );

    return await this.bikeTestRepository.create(bikeTest);
  }
}
