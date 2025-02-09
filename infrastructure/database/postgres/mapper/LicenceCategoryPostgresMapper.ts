import { LicenceCategoryRepository } from "@domain/repositories/LicenceCategoryRepository.ts";
import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class LicenceCategoryPostgresMapper implements LicenceCategoryRepository {
  constructor(private connection: PostgresConnection) {}

  public async create(category: LicenceCategory): Promise<LicenceCategory> {
    const client = this.connection.getClient();

    // On insère id, name, transmission_type
    const result = await client.queryObject<LicenceCategory>(
      `INSERT INTO licence_category (id, name, transmission_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [category.id, category.name, category.transmission_type]
    );

    if (result.rows.length === 0) {
      throw new Error("Erreur lors de la création de la catégorie.");
    }
    return result.rows[0];
  }

  public async getAll(): Promise<LicenceCategory[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<LicenceCategory>(`SELECT * FROM licence_category`);
    return result.rows;
  }

  public async getById(id: string): Promise<LicenceCategory | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<LicenceCategory>(`SELECT * FROM licence_category WHERE id = $1`, [id]);
    return result.rows.length ? result.rows[0] : null;
  }

  public async update(category: LicenceCategory): Promise<LicenceCategory> {
    const client = this.connection.getClient();
    const result = await client.queryObject<LicenceCategory>(
      `UPDATE licence_category
         SET name = $1,
             transmission_type = $2
       WHERE id = $3
       RETURNING *`,
      [category.name, category.transmission_type, category.id]
    );

    if (result.rows.length === 0) {
      throw new Error("Erreur lors de la mise à jour de la catégorie.");
    }
    return result.rows[0];
  }

  public async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    await client.queryArray(`DELETE FROM licence_category WHERE id = $1`, [id]);
  }
}
