import { DriverLicenceRepository } from "@domain/repositories/DriverLicenceRepository.ts";
import { DriverLicence } from "@domain/entities/DriverLicence.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class DriverLicencePostgresMapper implements DriverLicenceRepository {
  constructor(private connection: PostgresConnection) {}

  /**
   * 🚀 Création d'un permis de conduire
   */
  public async create(licence: DriverLicence): Promise<DriverLicence> {
    const client = this.connection.getClient();

    console.log("📌 Insertion du permis avec les valeurs :", licence);

    const result = await client.queryObject<DriverLicence>(
      `INSERT INTO driver_licence 
      (id, lastname, firstname, issue_date, expiration_date, licence_number, points, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        licence.id,
        licence.lastName,
        licence.firstName,
        licence.issueDate instanceof Date ? licence.issueDate : new Date(licence.issueDate || Date.now()), // ✅ Conversion sécurisée
        licence.expirationDate instanceof Date
          ? licence.expirationDate
          : new Date(licence.expirationDate || Date.now()), // ✅ Conversion sécurisée
        licence.licenceNumber,
        licence.userId,
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("❌ Insertion échouée pour le permis de conduire.");
    }

    console.log("✅ Permis inséré avec succès :", result.rows[0]);
    return result.rows[0];
  }

  /**
   * 🚀 Récupération des permis d'un utilisateur ou de tous les permis
   */
  public async getByUserId(userId: string): Promise<DriverLicence[]> {
    const client = this.connection.getClient();
    let query = `SELECT id, lastname, firstname, issue_date, expiration_date, licence_number, points, user_id FROM driver_licence`;
    let params: string[] = [];

    if (userId !== "all") {
      query += ` WHERE user_id = $1`;
      params = [userId];
    }

    console.log(`📌 Récupération des permis pour userId: ${userId}`);

    const result = await client.queryObject<{
      id: string;
      lastname: string;
      firstname: string;
      issue_date: string | null;
      expiration_date: string | null;
      licence_number: string;
      user_id: string;
    }>(query, params);

    console.log("✅ Permis récupérés :", result.rows.length);

    // ✅ Correction : Si une date est `null`, on met une date par défaut
    return result.rows.map((row) => ({
      id: row.id,
      lastName: row.lastname, // Adapter les noms de colonnes
      firstName: row.firstname,
      issueDate: row.issue_date ? new Date(row.issue_date) : new Date(0), // ✅ Date par défaut
      expirationDate: row.expiration_date ? new Date(row.expiration_date) : new Date(0), // ✅ Date par défaut
      licenceNumber: row.licence_number,
      userId: row.user_id,
    }));
  }

  /**
   * 🚀 Mise à jour d'un permis de conduire
   */
  public async update(licence: DriverLicence): Promise<DriverLicence> {
    const client = this.connection.getClient();

    console.log("📌 Mise à jour du permis :", licence);

    const result = await client.queryObject<DriverLicence>(
      `UPDATE driver_licence
      SET lastname = $1, firstname = $2, issue_date = $3, 
          expiration_date = $4, licence_number = $5, points = $6
      WHERE id = $7
      RETURNING *`,
      [
        licence.lastName,
        licence.firstName,
        licence.issueDate instanceof Date ? licence.issueDate : new Date(licence.issueDate || Date.now()), // ✅ Conversion sécurisée
        licence.expirationDate instanceof Date
          ? licence.expirationDate
          : new Date(licence.expirationDate || Date.now()), // ✅ Conversion sécurisée
        licence.licenceNumber,
        licence.id,
      ]
    );

    if (result.rows.length === 0) {
      throw new Error("❌ Mise à jour échouée pour le permis de conduire.");
    }

    console.log("✅ Permis mis à jour :", result.rows[0]);
    return result.rows[0];
  }

  /**
   * 🚀 Suppression d'un permis de conduire
   */
  public async delete(id: string): Promise<void> {
    const client = this.connection.getClient();
    console.log(`🗑 Suppression du permis avec ID: ${id}`);

    await client.queryArray(`DELETE FROM driver_licence WHERE id = $1`, [id]);

    console.log("✅ Permis supprimé avec succès.");
  }
}
