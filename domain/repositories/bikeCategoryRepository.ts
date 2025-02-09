import { BikeCategory } from "../entities/BikeCategory.ts";

export interface BikeCategoryRepository {
  create(bikeCategory: BikeCategory): Promise<BikeCategory>;
  findById(id: string): Promise<BikeCategory | null>;
  findByName(name: string): Promise<BikeCategory | null>;
  findAll(): Promise<BikeCategory[]>;
  update(bikeCategory: BikeCategory): Promise<BikeCategory>;
  delete(id: string): Promise<void>;
}
