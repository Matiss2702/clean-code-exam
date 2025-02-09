import { BikeRepository } from "@domain/repositories/BikeRepository.ts";
import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";
import { Bike } from "@domain/entities/Bike.ts";

export class CreateBikeUseCase {
  constructor(
    private bikeRepository: BikeRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async execute(
    purchase_date: Date,
    serial_number: string,
    mileage: number,
    plate_number: string,
    bike_production_batch_id: string,
    bike_status_id: string,
    model_id: string
  ): Promise<Bike> {
    console.log("UC Création de la moto : ", serial_number);
    if (!serial_number || serial_number.trim().length < 2) {
      throw new Error("Le numéro de série de la moto doit contenir au moins 2 caractères.");
    }

    if (!plate_number || plate_number.trim().length < 2) {
      throw new Error("Le numéro de plaque de la moto doit contenir au moins 2 caractères.");
    }

    const existingBike = await this.bikeRepository.findBySerialNumber(serial_number);
    if (existingBike) {
      throw new Error("Une moto avec ce numéro de série existe déjà.");
    }

    const bikeID = this.uuidGenerator.generateUuid();
    const bike = new Bike(
      bikeID,
      purchase_date,
      serial_number.trim(),
      mileage,
      plate_number.trim(),
      bike_production_batch_id,
      bike_status_id,
      model_id
    );

    return await this.bikeRepository.create(bike);
  }

  public async update(
    id: string,
    purchase_date: Date,
    serial_number: string,
    mileage: number,
    plate_number: string,
    bike_status_id: string,
    model_id: string
  ): Promise<Bike> {
    if (!id || !serial_number.trim() || !plate_number.trim()) {
      throw new Error("Tous les champs de la moto sont requis.");
    }

    const existingBike = await this.bikeRepository.findById(id);
    if (!existingBike) {
      throw new Error("La moto à mettre à jour n'existe pas.");
    }

    existingBike.serial_number = serial_number.trim();
    existingBike.mileage = mileage;
    existingBike.plate_number = plate_number.trim();
    existingBike.bike_status_id = bike_status_id;
    existingBike.model_id = model_id;
    existingBike.production_batch_id = "";
    existingBike.purchase_date = purchase_date;
    
    return await this.bikeRepository.update(existingBike);
  }

  public async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error("L'ID de la moto est requis.");
    }

    const existingBike = await this.bikeRepository.findById(id);
    if (!existingBike) {
      throw new Error("La moto à supprimer n'existe pas.");
    }

    await this.bikeRepository.delete(id);
  }
}
