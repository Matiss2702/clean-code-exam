export interface DriverLicenceDTO {
  id?: string;
  lastName: string;
  firstName: string;
  issueDate: string; // format: YYYY-MM-DD
  expirationDate: string; // format: YYYY-MM-DD
  licenceNumber: string;
  userId: string;
  categories?: string[]; // ex: ["A", "B"]
}
