export class LicenceCategory {
  constructor(
    public id: string,
    public name: string,
    public transmissionType: "manuelle" | "automatique" = "manuelle"
  ) {}
}
