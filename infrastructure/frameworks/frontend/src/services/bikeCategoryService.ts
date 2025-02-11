import axios from "axios";
import BikeCategory from "@/domain/entities/BikeCategory";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createBikeCategory = async (data: BikeCategory) => {
  try {
    const response = await axios.post(`${API_URL}/bike-category`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBikeCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/bike-category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBikeCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike-category/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBikeCategory = async (
  id: string,
  data: { name: string; description: string }
) => {
  try {
    const response = await axios.put(`${API_URL}/bike-category/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBikeCategory = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/bike-category/${id}`);
  } catch (error) {
    throw error;
  }
};
