import { ModelRepository } from "@domain/repositories/ModelRepository.ts";
import { Model } from "@domain/entities/Model.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class ModelPostgresMapper implements ModelRepository {
  constructor(private connection: PostgresConnection) {}

  async create(model: Model): Promise<Model> {
    console.log("Mapper Création du modèle de moto :", model);
    const client = this.connection.getClient();
    await client.queryArray`
      INSERT INTO
      model (
        id, 
        name, 
        link, 
        maintenance_mileage_alert, 
        maintenance_period_alert, 
        top_case, 
        seat, 
        transmission_type, 
        brand_id, 
        bike_category_id
      ) 
      VALUES (
        ${model.id}, 
        ${model.name}, 
        ${model.link}, 
        ${model.maintenance_mileage_alert}, 
        ${model.maintenance_period_alert}, 
        ${model.top_case}, 
        ${model.seat}, 
        ${model.transmission_type}, 
        ${model.brand_id}, 
        ${model.bike_category_id}
      )
    `;
    return model;
  }

  async findById(id: string): Promise<Model | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Model>`
      SELECT * FROM model WHERE id = ${id}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByName(name: string): Promise<Model | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Model>`
      SELECT * FROM model WHERE name = ${name}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByLink(link: string): Promise<Model | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Model>`
      SELECT * FROM model WHERE link = ${link}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByBrandId(brandId: string): Promise<Model[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Model>`
      SELECT * FROM model WHERE brand_id = ${brandId}
    `;
    return result.rows;
  }

  async findByBikeCategoryId(bikeCategoryId: string): Promise<Model[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Model>`
      SELECT * FROM model WHERE bike_category_id = ${bikeCategoryId}
    `;
    return result.rows;
  }

  async findAll(): Promise<Model[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<Model>("SELECT * FROM model");
    return result.rows;
  }

  async update(model: Model): Promise<Model> {
    console.log("Mise à jour du modèle de moto :", model);
    const client = this.connection.getClient();
    const result = await client.queryObject<Model>`
      UPDATE model
      SET
        name = ${model.name},
        link = ${model.link},
        maintenance_mileage_alert = ${model.maintenance_mileage_alert},
        maintenance_period_alert = ${model.maintenance_period_alert},
        top_case = ${model.top_case},
        seat = ${model.seat},
        transmission_type = ${model.transmission_type},
        brand_id = ${model.brand_id},
        bike_category_id = ${model.bike_category_id}
      WHERE id = ${model.id}
      RETURNING *
    `;
    return result.rows.length > 0 ? result.rows[0] : model;
  }

  async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    await client.queryObject`
      DELETE FROM model WHERE id = ${id}
    `;
  }
}
