import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";
import { Brand } from "@domain/entities/Brand.ts";

export class CreateBrandUseCase {
  constructor(
    private brandRepository: BrandRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async execute(name: string, description: string): Promise<Brand> {
    console.log("UC Création de la marque :", name);
    if (!name || name.trim().length < 2) {
      throw new Error("Le nom de la marque doit contenir au moins 2 caractères.");
    }

    if (!description || description.length < 10) {
      throw new Error("La description de la marque doit contenir au moins 10 caractères.");
    }

    const existingBrand = await this.brandRepository.findByName(name);
    if (existingBrand) {
      throw new Error("Une marque avec ce nom existe déjà.");
    }

    const link = name.trim().toLowerCase().replace(/\s+/g, '-');
    const brandID = this.uuidGenerator.generateUuid();
    const brand = new Brand(brandID, name.trim(), description, link)

    return await this.brandRepository.create(brand);
  }

  public async update(id: string, name: string, description: string): Promise<Brand> {
    if ((!id) || (!name.trim()) || (!description)) {
      throw new Error("Tous les champs de la marque sont requis.");
    }
    
    const existingBrand = await this.brandRepository.findById(id);
    if (!existingBrand) {
      throw new Error("La marque à mettre à jour n'existe pas.");
    }

    existingBrand.name = name.trim();
    existingBrand.description = description;
    existingBrand.link = name.trim().toLowerCase().replace(/\s+/g, '-');
    return await this.brandRepository.update(existingBrand);
  }

  public async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error("L'ID de la marque est requis.");
    }

    const existingBrand = await this.brandRepository.findById(id);
    if (!existingBrand) {
      throw new Error("La marque à supprimer n'existe pas.");
    }

    await this.brandRepository.delete(id);
  }
}
