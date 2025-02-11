import { BikePieceRepository } from "@domain/repositories/BikePieceRepository.ts";

export class UpdateBikePieceUseCase {
  constructor(
    private bikePieceRepository: BikePieceRepository
  ) {}

  public async execute(
    id: string,
    name: string,
    reference: string,
    price: number,
    maintenance_period_alert: number,
    stock: number,
    stock_alert: number,
    bike_id: string
  ): Promise<BikePiece> {
    if (!id || !name.trim() || !reference.trim()) {
      throw new Error("Tous les champs de la pièce sont requis.");
    }

    const existingBikePiece = await this.bikePieceRepository.findById(id);
    if (!existingBikePiece) {
      throw new Error("La pièce à mettre à jour n'existe pas.");
    }

    existingBikePiece.name = name.trim();
    existingBikePiece.reference = reference.trim();
    existingBikePiece.price = price;
    existingBikePiece.maintenance_period_alert = maintenance_period_alert;
    existingBikePiece.stock = stock;
    existingBikePiece.stock_alert = stock_alert;
    existingBikePiece.bike_id = bike_id;

    return await this.bikePieceRepository.update(existingBikePiece);
  }
}
