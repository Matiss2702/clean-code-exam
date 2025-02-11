import { BikePiece } from "../entities/BikePiece.ts";

export interface BikePieceRepository {
  create(bikePiece: BikePiece): Promise<BikePiece>;
  findById(id: string): Promise<BikePiece | null>;
  findByName(name: string): Promise<BikePiece | null>;
  findAll(): Promise<BikePiece[]>;
  findByReference(reference: string): Promise<BikePiece | null>;
  update(bikePiece: BikePiece): Promise<BikePiece>;
  delete(id: string): Promise<void>;
}