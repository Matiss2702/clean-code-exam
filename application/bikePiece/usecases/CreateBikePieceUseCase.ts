import { BikePieceRepository } from "@domain/repositories/BikePieceRepository.ts";
import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";
import { BikePiece } from "@domain/entities/BikePiece.ts";

export class CreateBikePieceUseCase {
  constructor(
    private bikePieceRepository: BikePieceRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async execute(
    name: string,
    reference: string,
    price: number,
    maintenance_period_alert: number,
    stock: number,
    stock_alert: number,
    bike_id: string
  ): Promise<BikePiece> {
    console.log("UC Création de la pièce de moto : ", reference);

    if (!name || name.trim().length < 2) {
      throw new Error("Le nom de la pièce doit contenir au moins 2 caractères.");
    }

    if (!reference || reference.trim().length < 2) {
      throw new Error("La référence de la pièce doit contenir au moins 2 caractères.");
    }

    if (price <= 0) {
      throw new Error("Le prix de la pièce doit être supérieur à zéro.");
    }

    if (stock < 0) {
      throw new Error("Le stock de la pièce ne peut pas être inférieur à zéro.");
    }

    if (stock_alert < 0) {
      throw new Error("Le stock d'alerte ne peut pas être inférieur à zéro.");
    }

    const bikePieceID = this.uuidGenerator.generateUuid();
    const bikePiece = new BikePiece(
      bikePieceID,
      name.trim(),
      reference.trim(),
      price,
      maintenance_period_alert,
      stock,
      stock_alert,
      bike_id
    );

    return await this.bikePieceRepository.create(bikePiece);
  }
}