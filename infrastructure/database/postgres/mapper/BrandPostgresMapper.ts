import { BrandRepository } from "@domain/repositories/BrandRepository.ts";
import { Brand } from "@domain/entities/Brand.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class BrandPostgresMapper implements BrandRepository {
  constructor(private connection: PostgresConnection) {}

  async create(brand: Brand): Promise<Brand> {
    console.log("Mapper Création de la marque :", brand);
    const client = this.connection.getClient();
    await client.queryArray`
      INSERT INTO
      brands (id, name, description, link) 
      VALUES (${brand.id}, ${brand.name}, ${brand.description}, ${brand.link})
    `;
    return brand;
  }

  async findById(id: string): Promise<Brand | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Brand>`
      SELECT id FROM brands WHERE id = ${id}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByName(name: string): Promise<Brand | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Brand>`
      SELECT * FROM brands WHERE name = ${name}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByLink(link: string): Promise<Brand | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Brand>`
      SELECT * FROM brands WHERE link = ${link}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findAll(): Promise<Brand[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Brand>("SELECT * FROM brands");
    return result.rows;
  }

  async update(brand: Brand): Promise<Brand> {
    console.log("Mise à jour de la marque :", brand);

    const client = this.connection.getClient();

    const result = await client.queryObject<Brand>`
      UPDATE brands
      SET
        name = ${brand.name},
        description = ${brand.description},
        link = ${brand.link}
      WHERE id = ${brand.id}
      RETURNING *
    `;

    return result.rows.length > 0 ? result.rows[0] : brand;
  }

  async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    await client.queryObject`
      DELETE FROM brands WHERE id = ${id}
    `;
  }
}
