import { BikeRepository } from "@domain/repositories/BikeRepository.ts";
import { Bike } from "@domain/entities/Bike.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class BikePostgresMapper implements BikeRepository {
  constructor(private connection: PostgresConnection) {}

  async create(bike: Bike): Promise<Bike> {
    console.log("Mapper Création de la moto :", bike);
    const client = this.connection.getClient();
    await client.queryArray`
      INSERT INTO
      bike (
        id,
        purchase_date,
        serial_number,
        mileage,
        plate_number,
        production_batch_id,
        bike_status_id,
        model_id
      ) 
      VALUES (
        ${bike.id},
        ${bike.purchase_date},
        ${bike.serial_number},
        ${bike.mileage},
        ${bike.plate_number},
        ${bike.production_batch_id},
        ${bike.bike_status_id},
        ${bike.model_id}
      )
    `;
    return bike;
  }

  async findById(id: string): Promise<Bike | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Bike>`
      SELECT * FROM bike WHERE id = ${id}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findBySerialNumber(serialNumber: string): Promise<Bike | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Bike>`
      SELECT * FROM bike WHERE serial_number = ${serialNumber}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByPlateNumber(plateNumber: string): Promise<Bike | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Bike>`
      SELECT * FROM bike WHERE plate_number = ${plateNumber}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByLink(link: string): Promise<Bike | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Bike>`
      SELECT * FROM bike WHERE link = ${link}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findAll(): Promise<Bike[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Bike>("SELECT * FROM bike");
    return result.rows;
  }

  async update(bike: Bike): Promise<Bike> {
    console.log("Mise à jour de la moto :", bike);
    const client = this.connection.getClient();
    const result = await client.queryObject<Bike>`
      UPDATE bike
      SET
        purchase_date = ${bike.purchase_date},
        serial_number = ${bike.serial_number},
        mileage = ${bike.mileage},
        plate_number = ${bike.plate_number},
        production_batch_id = ${bike.production_batch_id},
        bike_status_id = ${bike.bike_status_id},
        model_id = ${bike.model_id}
      WHERE id = ${bike.id}
      RETURNING *
    `;
    return result.rows.length > 0 ? result.rows[0] : bike;
  }

  async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    await client.queryObject`
      DELETE FROM bike WHERE id = ${id}
    `;
  }
}
