import { BikeTestRepository } from "@domain/repositories/BikeTestRepository.ts";
import { BikeTest } from "@domain/entities/BikeTest.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class BikeTestPostgresMapper implements BikeTestRepository {
  constructor(private connection: PostgresConnection) {}

  async create(bikeTest: BikeTest): Promise<BikeTest> {
    const client = this.connection.getClient();
    try {
      const result = await client.queryObject<BikeTest>`
        INSERT INTO bike_test (id, user_id, bike_id, started_at, ended_at, is_accepted, price)
        VALUES (${bikeTest.id}, ${bikeTest.user_id}, ${bikeTest.bike_id}, ${bikeTest.started_at}, ${bikeTest.ended_at}, ${bikeTest.is_accepted}, ${bikeTest.price})
        RETURNING *;
      `;
      return result.rows[0];
    } catch (error) {
      console.error("❌ Erreur lors de la création d'un test de moto :", error);
      throw error;
    }
  }

  async findById(id: string): Promise<BikeTest | null> {
    const client = this.connection.getClient();
    try {
      const result = await client.queryObject<BikeTest>`
        SELECT * FROM bike_test WHERE id = ${id}
      `;
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du test de moto :", error);
      throw error;
    }
  }

  async findAll(): Promise<BikeTest[]> {
    const client = this.connection.getClient();
    try {
      const result = await client.queryObject<BikeTest>("SELECT * FROM bike_test");
      return result.rows;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération de tous les tests de moto :", error);
      throw error;
    }
  }

  async findByUser(user_id: string): Promise<BikeTest[]> {
    const client = this.connection.getClient();
    try {
      const result = await client.queryObject<BikeTest>`
        SELECT * FROM bike_test WHERE user_id = ${user_id}
      `;
      return result.rows;
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des tests de moto par utilisateur :", error);
      throw error;
    }
  }

  async update(bikeTest: BikeTest): Promise<BikeTest> {
    const client = this.connection.getClient();
    try {
      const result = await client.queryObject<BikeTest>`
        UPDATE bike_test
        SET user_id = ${bikeTest.user_id}, 
            bike_id = ${bikeTest.bike_id}, 
            started_at = ${bikeTest.started_at}, 
            ended_at = ${bikeTest.ended_at}, 
            is_accepted = ${bikeTest.is_accepted}, 
            price = ${bikeTest.price}
        WHERE id = ${bikeTest.id}
        RETURNING *;
      `;
      return result.rows.length > 0 ? result.rows[0] : bikeTest;
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du test de moto :", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    try {
      await client.queryObject`
        DELETE FROM bike_test WHERE id = ${id}
      `;
    } catch (error) {
      console.error("❌ Erreur lors de la suppression du test de moto :", error);
      throw error;
    }
  }
}
