import axios from "axios";
import BikePiece from "@/domain/entities/BikePiece";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Créer une nouvelle pièce pour une moto
export const createBikePiece = async (data: BikePiece) => {
  try {
    const response = await axios.post(`${API_URL}/bike-piece`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la pièce", error);
    throw error;
  }
};

// Récupérer toutes les pièces
export const getAllBikePieces = async () => {
  try {
    const response = await axios.get(`${API_URL}/bike-piece`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des pièces", error);
    throw error;
  }
};

// Récupérer une pièce par son identifiant
export const getBikePieceById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike-piece/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la pièce", error);
    throw error;
  }
};

// Récupérer les pièces par bike_id
export const getBikePiecesByBikeId = async (bikeId: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike-piece/bike/${bikeId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des pièces pour la moto",
      error
    );
    throw error;
  }
};

// Mettre à jour une pièce
export const updateBikePiece = async (id: string, data: BikePiece) => {
  try {
    const response = await axios.put(`${API_URL}/bike-piece/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la pièce", error);
    throw error;
  }
};

// Supprimer une pièce
export const deleteBikePieceService = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/bike-piece/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la pièce", error);
    throw error;
  }
};
