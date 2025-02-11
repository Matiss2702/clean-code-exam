import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Erreur de connexion.";
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Erreur d'inscription.";
  }
};
