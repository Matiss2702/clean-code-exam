import { BikePieceRepository } from "@domain/repositories/BikePieceRepository.ts";

export class DeleteBikePieceUseCase {
  constructor(
    private bikePieceRepository: BikePieceRepository
  ) {}

  public async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("L'ID de la pièce est requis.");
    }

    const existingBikePiece = await this.bikePieceRepository.findById(id);
    if (!existingBikePiece) {
      throw new Error("La pièce à supprimer n'existe pas.");
    }

    await this.bikePieceRepository.delete(id);
  }
}
