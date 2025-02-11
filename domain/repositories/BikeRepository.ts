import { Bike } from "../entities/Bike.ts";

export interface BikeRepository {
  create(bike: Bike): Promise<Bike>;
  findById(id: string): Promise<Bike | null>;
  findBySerialNumber(serialNumber: string): Promise<Bike | null>;
  findByPlateNumber(plateNumber: string): Promise<Bike | null>;
  findByLink(link: string): Promise<Bike | null>;
  findAll(): Promise<Bike[]>;
  update(bike: Bike): Promise<Bike>;
  delete(id: string): Promise<void>;
}
