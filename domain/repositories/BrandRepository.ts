import { Brand } from "../entities/Brand.ts";

export interface BrandRepository {
  create(brand: Brand): Promise<Brand>;
  findById(id: string): Promise<Brand | null>;
  findByName(name: string): Promise<Brand | null>;
  findByLink(link: string): Promise<Brand | null>;
  findAll(): Promise<Brand[]>;
  update(brand: Brand): Promise<Brand>;
  delete(id: string): Promise<void>;
}
