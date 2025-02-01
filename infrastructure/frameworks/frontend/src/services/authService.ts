import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const login = async (email: string, password: string) => {
  try {
    console.log("📤 Envoi de la requête de connexion...");
    const response = await axios.post(`${API_URL}/login`, { email, password });

    console.log("✅ Réponse reçue :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur Axios :", error);
    throw error.response?.data?.error || "Erreur de connexion.";
  }
};

export const register = async (data) => {
  console.log("📤 Envoi de la requête d'inscription...", data);
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("✅ Réponse reçue :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur Axios :", error);
    throw error.response?.data?.error || "Erreur d'inscription.";
  }
};
