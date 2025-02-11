import axios from "axios";
import Bike from "@/domain/entities/Bike";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createBike = async (data: Bike) => {
  try {
    const response = await axios.post(`${API_URL}/bike`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBikes = async () => {
  try {
    const response = await axios.get(`${API_URL}/bike`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBikeById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBikeByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike/name/${name}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la marque", error);
    throw error;
  }
};

export const getBikeByLink = async (link: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike/link/${link}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la marque", error);
    throw error;
  }
};

export const updateBike = async (id: string, data: Bike) => {
  try {
    const response = await axios.put(`${API_URL}/bike/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBikeService = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/bike/${id}`);
  } catch (error) {
    throw error;
  }
};
