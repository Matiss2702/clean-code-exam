import { DriverLicenceRepository } from "../../../domain/repositories/DriverLicenceRepository.ts";

export class DeleteDriverLicenceUseCase {
  constructor(private repository: DriverLicenceRepository) {}

  async execute(id: string): Promise<void> {
    return await this.repository.delete(id);
  }
}
