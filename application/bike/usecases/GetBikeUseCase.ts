import { BikeRepository } from "@domain/repositories/BikeRepository.ts";
import { Bike } from "@domain/entities/Bike.ts";

export class GetBikeUseCase {
  constructor(private bikeRepository: BikeRepository) {}

  // Récupère une moto par ID
  async execute(id: string): Promise<Bike | null> {
    if (!id) {
      throw new Error("L'ID de la moto est requis.");
    }

    return await this.bikeRepository.findById(id);
  }

  // Récupère toutes les motos
  async getAll(): Promise<Bike[]> {
    return await this.bikeRepository.findAll();
  }

  // Récupère une moto par numéro de série
  async getBySerialNumber(serialNumber: string): Promise<Bike | null> {
    return await this.bikeRepository.findBySerialNumber(serialNumber);
  }

  // Récupère une moto par numéro de plaque
  async getByPlateNumber(plateNumber: string): Promise<Bike | null> {
    return await this.bikeRepository.findByPlateNumber(plateNumber);
  }
}
