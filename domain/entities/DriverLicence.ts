export class DriverLicence {
  constructor(
    public id: string,
    public lastName: string,
    public firstName: string,
    public issueDate: Date,
    public expirationDate: Date,
    public licenceNumber: string,
    public userId: string
  ) {}
}
