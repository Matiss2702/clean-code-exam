// domain/repositories/DriverLicenceRepository.ts
import { DriverLicence } from "../entities/DriverLicence.ts";
import { LicenceCategory } from "../entities/LicenceCategory.ts";

export interface DriverLicenceRepository {
  create(licence: DriverLicence): Promise<DriverLicence>;
  getByUserId(userId: string): Promise<DriverLicence[]>;
  update(licence: DriverLicence): Promise<DriverLicence>;
  delete(id: string): Promise<void>;
  setCategories(driverLicenceId: string, categoryIds: string[]): Promise<void>;
  getCategories(driverLicenceId: string): Promise<LicenceCategory[]>;
}
