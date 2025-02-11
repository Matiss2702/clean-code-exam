import { BikeTest } from "@domain/entities/BikeTest.ts";

export interface BikeTestRepository {
  create(bikeTest: BikeTest): Promise<BikeTest>;
  findById(id: string): Promise<BikeTest | null>;
  findAll(): Promise<BikeTest[]>;
  findByUser(user_id: string): Promise<BikeTest[]>;
  update(bikeTest: BikeTest): Promise<BikeTest>;
  delete(id: string): Promise<void>;
}
