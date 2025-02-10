import axios from "axios";
import DriverLicence from "@/domain/entities/DriverLicence";
import LicenceCategory from "@/domain/entities/LicenceCategory";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * 🚀 Créer un permis de conduire
 */
export const createDriverLicence = async (data: DriverLicence) => {
  try {
    const response = await axios.post(`${API_URL}/driver-licence`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Récupérer tous les utilisateurs (pour l'assignation d'un permis)
 */
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Récupérer tous les permis de conduire d'un utilisateur
 */
export const getDriverLicencesByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/driver-licence/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Récupérer un permis de conduire par ID
 */
export const getDriverLicenceById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/driver-licence/id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Mettre à jour un permis de conduire
 */
export const updateDriverLicence = async (
  id: string,
  data: Partial<DriverLicence>
) => {
  try {
    const response = await axios.put(`${API_URL}/driver-licence/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Supprimer un permis de conduire
 */
export const deleteDriverLicence = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/driver-licence/${id}`);
  } catch (error) {
    throw error;
  }
};

const getDriverLicences = async (userId?: string) => {
  try {
    const params = userId && userId !== "all" ? { userId } : {}; // ⬅️ Fix ici
    const response = await axios.get(`${API_URL}/driver-licences`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Récupérer toutes les catégories de permis
 */
export const getAllLicenceCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/licence-category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Récupérer une catégorie de permis par ID
 */
export const getLicenceCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/licence-category/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Créer une nouvelle catégorie de permis
 */
export const createLicenceCategory = async (data: LicenceCategory) => {
  try {
    const response = await axios.post(`${API_URL}/licence-category`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Mettre à jour une catégorie de permis
 */
export const updateLicenceCategory = async (
  id: string,
  data: Partial<LicenceCategory>
) => {
  try {
    const response = await axios.put(
      `${API_URL}/licence-category/${id}`,
      data,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 🚀 Supprimer une catégorie de permis
 */
export const deleteLicenceCategory = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/licence-category/${id}`);
  } catch (error) {
    throw error;
  }
};
