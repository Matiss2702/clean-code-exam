// application/user/dto/DriverLicenceDTO.ts
import { LicenceCategoryDTO } from "./LicenceCategoryDTO.ts";

export interface DriverLicenceDTO {
  id?: string;
  lastName: string;
  firstName: string;
  issueDate: string; // format: YYYY-MM-DD
  expirationDate: string; // format: YYYY-MM-DD
  licenceNumber: string;
  userId: string;
  // Pour l'affichage, chaque catégorie est un objet complet
  categories?: LicenceCategoryDTO[];
}
