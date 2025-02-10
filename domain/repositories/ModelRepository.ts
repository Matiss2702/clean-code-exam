import { Model } from "../entities/Model.ts";

export interface ModelRepository {
  create(brand: Model): Promise<Model>;
  findById(id: string): Promise<Model | null>;
  findByName(name: string): Promise<Model | null>;
  findByLink(link: string): Promise<Model | null>;
  findAll(): Promise<Model[]>;
  update(brand: Model): Promise<Model>;
  delete(id: string): Promise<void>;
  findByBrandId(brandId: string): Promise<Model[]>;
  findByBikeCategoryId(bikeCategoryId: string): Promise<Model[]>;
}
