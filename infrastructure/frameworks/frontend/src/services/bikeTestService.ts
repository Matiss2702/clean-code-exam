import axios from "axios";
import BikeTest from "@/domain/entities/BikeTest";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Créer une nouvelle location de moto (BikeTest)
 */
export const createBikeTest = async (data: BikeTest) => {
  try {
    const response = await axios.post(`${API_URL}/bike-test`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Récupérer toutes les locations de moto (BikeTest)
 */
export const getAllBikeTests = async () => {
  try {
    const response = await axios.get(`${API_URL}/bike-test`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Récupérer les essais de moto d'un utilisateur spécifique
 */
export const getBikeTestsByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike-test/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des essais de moto :", error);
    throw error;
  }
};

/**
 * Accepter une location de moto
 */
export const acceptBikeTest = async (id: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/bike-test/${id}/accept`,
      null,
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
 * Mettre à jour une location de moto (ex: modifier la date de fin)
 */
export const updateBikeTest = async (id: string, data: BikeTest) => {
  try {
    const response = await axios.put(`${API_URL}/bike-test/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Supprimer une location de moto (BikeTest)
 */
export const deleteBikeTest = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/bike-test/${id}`);
  } catch (error) {
    throw error;
  }
};
