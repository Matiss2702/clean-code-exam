import { BikePieceRepository } from "@domain/repositories/BikePieceRepository.ts";
import { BikePiece } from "@domain/entities/BikePiece.ts";

export class GetBikePieceUseCase {
  constructor(private bikePieceRepository: BikePieceRepository) {}

  // Récupère une pièce de moto par ID
  async execute(id: string): Promise<BikePiece | null> {
    if (!id) {
      throw new Error("L'ID de la pièce est requis.");
    }

    return await this.bikePieceRepository.findById(id);
  }

  // Récupère toutes les pièces de moto
  async getAll(): Promise<BikePiece[]> {
    console.log("Récupération de toutes les pièces de moto via usecase...");
    return await this.bikePieceRepository.findAll();
  }

  // Recupère une pièce de moto par nom
  async getByName(name: string): Promise<BikePiece | null> {
    return await this.bikePieceRepository.findByName(name);
  }

  // Recupère une pièce de moto par référence
  async getByReference(reference: string): Promise<BikePiece | null> {
    return await this.bikePieceRepository.findByReference(reference);
  }
}