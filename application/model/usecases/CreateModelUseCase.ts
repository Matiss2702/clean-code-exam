import { ModelRepository } from "@domain/repositories/ModelRepository.ts";
import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";
import { Model } from "@domain/entities/Model.ts";

export class CreateModelUseCase {
  constructor(
    private modelRepository: ModelRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  public async execute(
    name: string,
    maintenance_mileage_alert: number,
    maintenance_period_alert: number,
    top_case: number,
    seat: number,
    transmission_type: string,
    brand_id: string,
    bike_category_id: string
  ): Promise<Model> {
    console.log("UC Création du modèle :", name);

    if (!name || name.trim().length < 2) {
      throw new Error("Le nom du modèle doit contenir au moins 2 caractères.");
    }

    if (maintenance_mileage_alert <= 0) {
      throw new Error("L'alerte de kilométrage d'entretien doit être supérieure à zéro.");
    }

    if (maintenance_period_alert <= 0) {
      throw new Error("La période d'entretien doit être supérieure à zéro.");
    }

    if (!transmission_type || transmission_type.trim().length < 2) {
      throw new Error("Le type de transmission doit contenir au moins 2 caractères.");
    }

    if (!brand_id || !bike_category_id) {
      throw new Error("Les IDs de la marque et de la catégorie de vélo sont requis.");
    }

    const existingModel = await this.modelRepository.findByName(name);
    if (existingModel) {
      throw new Error("Un modèle avec ce nom existe déjà.");
    }

    const modelID = this.uuidGenerator.generateUuid();

    const link = name.trim().toLowerCase().replace(/\s+/g, '-');

    const model = new Model(
      modelID,
      name.trim(),
      link,
      maintenance_mileage_alert,
      maintenance_period_alert,
      top_case,
      seat,
      transmission_type.trim(),
      brand_id,
      bike_category_id
    );

    return await this.modelRepository.create(model);
  }

  public async update(
    id: string,
    name: string,
    maintenance_mileage_alert: number,
    maintenance_period_alert: number,
    top_case: number,
    seat: number,
    transmission_type: string,
    brand_id: string,
    bike_category_id: string
  ): Promise<Model> {
    if ((!id) || (!name.trim()) || (!maintenance_mileage_alert) || (!maintenance_period_alert) ||
        (!top_case) || (!seat) || (!transmission_type.trim()) || (!brand_id) || (!bike_category_id)) {
      throw new Error("Tous les champs du modèle sont requis.");
    }

    const existingModel = await this.modelRepository.findById(id);
    if (!existingModel) {
      throw new Error("Le modèle à mettre à jour n'existe pas.");
    }

    existingModel.name = name.trim();
    existingModel.maintenance_mileage_alert = maintenance_mileage_alert;
    existingModel.maintenance_period_alert = maintenance_period_alert;
    existingModel.top_case = top_case;
    existingModel.seat = seat;
    existingModel.transmission_type = transmission_type.trim();
    existingModel.brand_id = brand_id;
    existingModel.bike_category_id = bike_category_id;
    existingModel.link = name.trim().toLowerCase().replace(/\s+/g, '-');

    return await this.modelRepository.update(existingModel);
  }

  public async delete(id: string): Promise<void> {
    if (!id) {
      throw new Error("L'ID du modèle est requis.");
    }

    const existingModel = await this.modelRepository.findById(id);
    if (!existingModel) {
      throw new Error("Le modèle à supprimer n'existe pas.");
    }

    await this.modelRepository.delete(id);
  }
}
