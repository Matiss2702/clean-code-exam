import { LicenceCategory } from "../entities/LicenceCategory.ts";

export interface LicenceCategoryRepository {
  create(category: LicenceCategory): Promise<LicenceCategory>;
  getAll(): Promise<LicenceCategory[]>;
  getById(id: string): Promise<LicenceCategory | null>;
  update(category: LicenceCategory): Promise<LicenceCategory>;
  delete(id: string): Promise<void>;
}
