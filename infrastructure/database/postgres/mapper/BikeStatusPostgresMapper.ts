import { BikeStatusRepository } from "@domain/repositories/BikeStatusRepository.ts";
import { BikeStatus } from "@domain/entities/BikeStatus.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class BikeStatusPostgresMapper implements BikeStatusRepository {
  constructor(private connection: PostgresConnection) {}

  async create(bikeStatus: BikeStatus): Promise<BikeStatus> {
    console.log("Mapper Création de l'état de moto :", bikeStatus);
    const client = this.connection.getClient();
    await client.queryArray`
      INSERT INTO
      bike_status (id, name) 
      VALUES (${bikeStatus.id}, ${bikeStatus.name})
    `;
    return bikeStatus;
  }

  async findById(id: string): Promise<BikeStatus | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeStatus>`
      SELECT * FROM bike_status WHERE id = ${id}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByName(name: string): Promise<BikeStatus | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeStatus>`
      SELECT * FROM bike_status WHERE name = ${name}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findAll(): Promise<BikeStatus[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeStatus>("SELECT * FROM bike_status");
    return result.rows;
  }

  async update(bikeStatus: BikeStatus): Promise<BikeStatus> {
    console.log("Mise à jour de l'état de moto :", bikeStatus);
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeStatus>`
      UPDATE bike_status
      SET
        name = ${bikeStatus.name}
      WHERE id = ${bikeStatus.id}
      RETURNING *
    `;
    return result.rows.length > 0 ? result.rows[0] : bikeStatus;
  }

  async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    await client.queryObject`
      DELETE FROM bike_status WHERE id = ${id}
    `;
  }
}
