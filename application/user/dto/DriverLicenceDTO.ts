import { LicenceCategoryDTO } from "./LicenceCategoryDTO.ts";

export interface DriverLicenceDTO {
  id?: string;
  lastName: string;
  firstName: string;
  issueDate: string;
  expirationDate: string;
  licenceNumber: string;
  userId: string;
  categories?: LicenceCategoryDTO[];
}
