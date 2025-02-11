import { BikePieceRepository } from "@domain/repositories/BikePieceRepository.ts";
import { BikePiece } from "@domain/entities/BikePiece.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class BikePiecePostgresMapper implements BikePieceRepository {
  constructor(private connection: PostgresConnection) {}

  async create(bikePiece: BikePiece): Promise<BikePiece> {
    console.log("Mapper Création de la pièce de moto :", bikePiece);
    const client = this.connection.getClient();
    await client.queryArray`
      INSERT INTO bike_piece (
        id,
        name,
        reference,
        price,
        maintenance_period_alert,
        stock,
        stock_alert,
        bike_id
      ) 
      VALUES (
        ${bikePiece.id},
        ${bikePiece.name},
        ${bikePiece.reference},
        ${bikePiece.price},
        ${bikePiece.maintenance_period_alert},
        ${bikePiece.stock},
        ${bikePiece.stock_alert},
        ${bikePiece.bike_id}
      )
    `;
    return bikePiece;
  }

  async findById(id: string): Promise<BikePiece | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikePiece>`
      SELECT * FROM bike_piece WHERE id = ${id}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByReference(reference: string): Promise<BikePiece | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikePiece>`
      SELECT * FROM bike_piece WHERE reference = ${reference}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findByBikeId(bikeId: string): Promise<BikePiece[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikePiece>`
      SELECT * FROM bike_piece WHERE bike_id = ${bikeId}
    `;
    return result.rows;
  }

  async findByName(name: string): Promise<BikePiece | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<BikePiece>`
      SELECT * FROM bike_piece WHERE name = ${name}
    `;
    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async findAll(): Promise<BikePiece[]> {
    console.log("recherche par mapper de toutes les pièces de moto");
    const client = this.connection.getClient();
    const result = await client.queryObject<BikePiece>("SELECT * FROM bike_piece");
    return result.rows;
  }

  async update(bikePiece: BikePiece): Promise<BikePiece> {
    console.log("Mise à jour de la pièce de moto :", bikePiece);
    const client = this.connection.getClient();
    const result = await client.queryObject<BikePiece>`
      UPDATE bike_piece
      SET
        name = ${bikePiece.name},
        reference = ${bikePiece.reference},
        price = ${bikePiece.price},
        maintenance_period_alert = ${bikePiece.maintenance_period_alert},
        stock = ${bikePiece.stock},
        stock_alert = ${bikePiece.stock_alert},
        bike_id = ${bikePiece.bike_id}
      WHERE id = ${bikePiece.id}
      RETURNING *
    `;
    return result.rows.length > 0 ? result.rows[0] : bikePiece;
  }

  async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    await client.queryObject`
      DELETE FROM bike_piece WHERE id = ${id}
    `;
  }
}
