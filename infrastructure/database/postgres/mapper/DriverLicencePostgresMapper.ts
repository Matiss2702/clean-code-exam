import { DriverLicenceRepository } from "@domain/repositories/DriverLicenceRepository.ts";
import { DriverLicence } from "@domain/entities/DriverLicence.ts";
import { LicenceCategory } from "@domain/entities/LicenceCategory.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class DriverLicencePostgresMapper implements DriverLicenceRepository {
  constructor(private connection: PostgresConnection) {}

  /**
   * 🚀 Création d'un permis de conduire (sans champ points)
   */
  public async create(licence: DriverLicence): Promise<DriverLicence> {
    const client = this.connection.getClient();

    console.log("📌 Insertion du permis avec les valeurs :", licence);

    const result = await client.queryObject<DriverLicence>(
      `INSERT INTO driver_licence
       (id, lastname, firstname, issue_date, expiration_date, licence_number, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        licence.id,
        licence.lastName,
        licence.firstName,
        licence.issueDate instanceof Date ? licence.issueDate : new Date(licence.issueDate || Date.now()),
        licence.expirationDate instanceof Date
          ? licence.expirationDate
          : new Date(licence.expirationDate || Date.now()),
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
    let query = `
      SELECT id, lastname, firstname, issue_date, expiration_date, licence_number, user_id
      FROM driver_licence
    `;
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

    return result.rows.map((row) => ({
      id: row.id,
      lastName: row.lastname,
      firstName: row.firstname,
      issueDate: row.issue_date ? new Date(row.issue_date) : new Date(0),
      expirationDate: row.expiration_date ? new Date(row.expiration_date) : new Date(0),
      licenceNumber: row.licence_number,
      userId: row.user_id,
    }));
  }

  /**
   * 🚀 Mise à jour d'un permis de conduire (sans champ points)
   */
  public async update(licence: DriverLicence): Promise<DriverLicence> {
    const client = this.connection.getClient();

    console.log("📌 Mise à jour du permis :", licence);

    const result = await client.queryObject<DriverLicence>(
      `UPDATE driver_licence
       SET lastname = $1, firstname = $2, issue_date = $3,
           expiration_date = $4, licence_number = $5, user_id = $6
       WHERE id = $7
       RETURNING *`,
      [
        licence.lastName,
        licence.firstName,
        licence.issueDate instanceof Date ? licence.issueDate : new Date(licence.issueDate || Date.now()),
        licence.expirationDate instanceof Date
          ? licence.expirationDate
          : new Date(licence.expirationDate || Date.now()),
        licence.licenceNumber,
        licence.userId,
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

    // 1. Supprimer d'abord les liens dans la table pivot
    await client.queryArray(`DELETE FROM driver_licence_category WHERE driver_licence_id = $1`, [id]);

    // 2. Supprimer ensuite la ligne driver_licence
    await client.queryArray(`DELETE FROM driver_licence WHERE id = $1`, [id]);

    console.log("✅ Permis supprimé avec succès.");
  }

  // --------------------------------------------------------------------------
  //                   🔥 GESTION DU MANY-TO-MANY
  // --------------------------------------------------------------------------

  /**
   * ⚙️ setCategories : Associe un permis à plusieurs catégories
   * @param driverLicenceId L'ID du permis
   * @param categoryIds Tableau d'IDs de licence_category
   */
  public async setCategories(driverLicenceId: string, categoryIds: string[]): Promise<void> {
    const client = this.connection.getClient();

    // 1. Supprimer les anciennes associations
    await client.queryArray(`DELETE FROM driver_licence_category WHERE driver_licence_id = $1`, [driverLicenceId]);

    // 2. Insérer les nouvelles
    for (const catId of categoryIds) {
      await client.queryArray(
        `INSERT INTO driver_licence_category (driver_licence_id, licence_category_id)
         VALUES ($1, $2)`,
        [driverLicenceId, catId]
      );
    }

    console.log(`✅ Mise à jour des catégories pour driver_licence ${driverLicenceId} :`, categoryIds);
  }

  /**
   * ⚙️ getCategories : Récupère la liste des catégories associées à un permis
   * @param driverLicenceId L'ID du permis
   * @returns un tableau d'entités LicenceCategory
   */
  public async getCategories(driverLicenceId: string): Promise<LicenceCategory[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<LicenceCategory>(
      `SELECT c.*
     FROM licence_category c
     JOIN driver_licence_category dlc ON c.id = dlc.licence_category_id
     WHERE dlc.driver_licence_id = $1`,
      [driverLicenceId]
    );
    return result.rows;
  }
}
