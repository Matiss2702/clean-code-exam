import { BikeCategoryRepository } from "@domain/repositories/bikeCategoryRepository.ts";
import { BikeCategory } from "@domain/entities/BikeCategory.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class BikeCategoryPostgresMapper implements BikeCategoryRepository {
  constructor(private connection: PostgresConnection) {}

  async create(bikeCategory: BikeCategory): Promise<BikeCategory> {
    console.log("Mapper Création de la catégorie de moto :", bikeCategory);
    const client = this.connection.getClient();
    await client.queryArray`
      INSERT INTO
      bike_category (id, name, minimum_age, minimum_experience) 
      VALUES (${bikeCategory.id}, ${bikeCategory.name}, ${bikeCategory.minimum_age}, ${bikeCategory.minimum_experience})
    `;
    return bikeCategory;
  }

  async findById(id: string): Promise<BikeCategory | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeCategory>`
      SELECT * FROM bike_category WHERE id = ${id}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByName(name: string): Promise<BikeCategory | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeCategory>`
      SELECT * FROM bike_category WHERE name = ${name}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findAll(): Promise<BikeCategory[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeCategory>("SELECT * FROM bike_category");
    return result.rows;
  }

  async update(bikeCategory: BikeCategory): Promise<BikeCategory> {
    console.log("Mise à jour de la catégorie de moto :", bikeCategory);
    const client = this.connection.getClient();
    const result = await client.queryObject<BikeCategory>`
      UPDATE bike_category
      SET
        name = ${bikeCategory.name},
        minimum_age = ${bikeCategory.minimum_age},
        minimum_experience = ${bikeCategory.minimum_experience}
      WHERE id = ${bikeCategory.id}
      RETURNING *
    `;
    return result.rows.length > 0 ? result.rows[0] : bikeCategory;
  }

  async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    await client.queryObject`
      DELETE FROM bike_category WHERE id = ${id}
    `;
  }
}
