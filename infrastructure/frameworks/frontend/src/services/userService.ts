import axios from "axios";
import User from "@/domain/entities/User";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Créer un nouvel utilisateur (Inscription)
 */
export const registerUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Connexion utilisateur
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
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
 * Récupérer tous les utilisateurs
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
 * Récupérer un utilisateur par ID
 */
export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
