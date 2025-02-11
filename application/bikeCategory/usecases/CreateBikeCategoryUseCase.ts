import { BikeCategoryRepository } from "@domain/repositories/bikeCategoryRepository.ts";

import { BikeCategory } from "@domain/entities/BikeCategory.ts";
import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";

export class CreateBikeCategoryUseCase {
  constructor(
    private bikeCategoryRepository: BikeCategoryRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async execute(name: string, minimum_age: number, minimum_experience: number): Promise<BikeCategory> {
    if (!name || name.trim().length < 2) {
      throw new Error("Le nom de la catégorie doit contenir au moins 2 caractères.");
    }

    if (minimum_age < 18) {
      throw new Error("L'âge minimum de la catégorie doit être supérieur ou égal à 18 ans.");
    }

    if (minimum_experience < 0) {
      throw new Error("L'expérience maximum doit être un nombre positif.");
    }

    const existingBikeCategory = await this.bikeCategoryRepository.findByName(name);
    if (existingBikeCategory) {
      throw new Error("Une catégorie de moto avec ce nom existe déjà.");
    }

    const bikeCategoryID = this.uuidGenerator.generateUuid();
    const bikeCategory = new BikeCategory(bikeCategoryID, name.trim(), minimum_age, minimum_experience);

    return await this.bikeCategoryRepository.create(bikeCategory);
  }

  public async getAll(): Promise<BikeCategory[]> {
    return await this.bikeCategoryRepository.findAll();
  }

  public async getById(id: string): Promise<BikeCategory | null> {
    return await this.bikeCategoryRepository.findById(id);
  }

  public async getByName(name: string): Promise<BikeCategory | null> {
    return await this.bikeCategoryRepository.findByName(name);
  }

  public async update(id: string, name: string, minimum_age: number, minimum_experience: number): Promise<BikeCategory> {
    if (!name || name.trim().length < 2) {
      throw new Error("Le nom de la catégorie doit contenir au moins 2 caractères.");
    }

    const existingBikeCategory = await this.bikeCategoryRepository.findById(id);
    if (!existingBikeCategory) {
      throw new Error("La catégorie de moto à mettre à jour n'existe pas.");
    }

    existingBikeCategory.name = name.trim();
    existingBikeCategory.minimum_age = minimum_age;
    existingBikeCategory.minimum_experience = minimum_experience;

    return await this.bikeCategoryRepository.update(existingBikeCategory);
  }

  public async delete(id: string): Promise<void> {
    const existingBikeCategory = await this.bikeCategoryRepository.findById(id);
    if (!existingBikeCategory) {
      throw new Error("La catégorie de moto à supprimer n'existe pas.");
    }

    await this.bikeCategoryRepository.delete(id);
  }
}
