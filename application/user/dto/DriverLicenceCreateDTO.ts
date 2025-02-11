export interface DriverLicenceCreateDTO {
  id?: string;
  lastName: string;
  firstName: string;
  issueDate: string;
  expirationDate: string;
  licenceNumber: string;
  userId: string;
  categories?: string[];
}
