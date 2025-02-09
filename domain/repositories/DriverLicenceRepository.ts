import { DriverLicence } from "../entities/DriverLicence.ts";

export interface DriverLicenceRepository {
  create(licence: DriverLicence): Promise<DriverLicence>;
  getByUserId(userId: string): Promise<DriverLicence[]>;
  update(licence: DriverLicence): Promise<DriverLicence>;
  delete(id: string): Promise<void>;
}
