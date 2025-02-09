import { BikeStatus } from "../entities/BikeStatus.ts";

export interface BikeStatusRepository {
  create(bikeStatus: BikeStatus): Promise<BikeStatus>;
  findById(id: string): Promise<BikeStatus | null>;
  findByName(name: string): Promise<BikeStatus | null>;
  findAll(): Promise<BikeStatus[]>;
  update(bikeStatus: BikeStatus): Promise<BikeStatus>;
  delete(id: string): Promise<void>;
}
