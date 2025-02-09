import axios from "axios";
import { LicenceCategory } from "@/domain/entities/LicenceCategory"; // adapte selon ton chemin

// Utilise une URL d'API, par exemple récupérée depuis Vite
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * 🚀 Récupérer toutes les catégories de permis
 * GET /licence-category
 */
export async function getAllLicenceCategories(): Promise<LicenceCategory[]> {
  const response = await axios.get(`${API_URL}/licence-category`);
  return response.data;
}

/**
 * 🚀 Récupérer une catégorie de permis par ID
 * GET /licence-category/:id
 */
export async function getLicenceCategoryById(
  id: string
): Promise<LicenceCategory> {
  const response = await axios.get(`${API_URL}/licence-category/${id}`);
  return response.data;
}

/**
 * 🚀 Créer une catégorie de permis
 * POST /licence-category
 */
export async function createLicenceCategory(
  data: Pick<LicenceCategory, "name" | "transmissionType">
) {
  const response = await axios.post(`${API_URL}/licence-category`, data, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}

/**
 * 🚀 Mettre à jour une catégorie de permis
 * PUT /licence-category/:id
 */
export async function updateLicenceCategory(
  id: string,
  data: Partial<LicenceCategory>
) {
  const response = await axios.put(`${API_URL}/licence-category/${id}`, data, {
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
}

/**
 * 🚀 Supprimer une catégorie de permis
 * DELETE /licence-category/:id
 */
export async function deleteLicenceCategory(id: string): Promise<void> {
  await axios.delete(`${API_URL}/licence-category/${id}`);
}
