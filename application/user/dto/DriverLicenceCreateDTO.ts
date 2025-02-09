// application/user/dto/DriverLicenceCreateDTO.ts
export interface DriverLicenceCreateDTO {
  id?: string;
  lastName: string;
  firstName: string;
  issueDate: string; // format: YYYY-MM-DD
  expirationDate: string; // format: YYYY-MM-DD
  licenceNumber: string;
  userId: string;
  // Pour la création/mise à jour, on envoie uniquement les IDs des catégories
  categories?: string[];
}
