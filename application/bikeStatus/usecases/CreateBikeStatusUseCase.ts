import { BikeStatusRepository } from "@domain/repositories/BikeStatusRepository.ts";
import { BikeStatus } from "@domain/entities/BikeStatus.ts";
import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";

export class CreateBikeStatusUseCase {
  constructor(
    private bikeStatusRepository: BikeStatusRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async execute(name: string): Promise<BikeStatus> {
    if (!name || name.trim().length < 2) {
      throw new Error("Le nom de l'état de la moto doit contenir au moins 2 caractères.");
    }

    const existingBikeStatus = await this.bikeStatusRepository.findByName(name);
    if (existingBikeStatus) {
      throw new Error("Un état de moto avec ce nom existe déjà.");
    }

    const bikeStatusID = this.uuidGenerator.generateUuid();
    const bikeStatus = new BikeStatus(bikeStatusID, name.trim());

    return await this.bikeStatusRepository.create(bikeStatus);
  }

  public async getAll(): Promise<BikeStatus[]> {
    return await this.bikeStatusRepository.findAll();
  }

  public async getById(id: string): Promise<BikeStatus | null> {
    return await this.bikeStatusRepository.findById(id);
  }

  public async getByName(name: string): Promise<BikeStatus | null> {
    return await this.bikeStatusRepository.findByName(name);
  }

  public async update(id: string, name: string): Promise<BikeStatus> {
    if (!name || name.trim().length < 2) {
      throw new Error("Le nom de l'état de la moto doit contenir au moins 2 caractères.");
    }

    const existingBikeStatus = await this.bikeStatusRepository.findById(id);
    if (!existingBikeStatus) {
      throw new Error("L'état de la moto à mettre à jour n'existe pas.");
    }

    existingBikeStatus.name = name.trim();
    return await this.bikeStatusRepository.update(existingBikeStatus);
  }

  public async delete(id: string): Promise<void> {
    const existingBikeStatus = await this.bikeStatusRepository.findById(id);
    if (!existingBikeStatus) {
      throw new Error("L'état de la moto à supprimer n'existe pas.");
    }

    await this.bikeStatusRepository.delete(id);
  }
}
