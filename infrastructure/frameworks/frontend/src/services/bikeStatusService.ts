import axios from "axios";
import BikeStatus from "@/domain/entities/BikeStatus";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createBikeStatus = async (data: BikeStatus) => {
  try {
    const response = await axios.post(`${API_URL}/bike-status`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBikeStatuses = async () => {
  try {
    const response = await axios.get(`${API_URL}/bike-status`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBikeStatusById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/bike-status/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBikeStatus = async (
  id: string,
  data: { status: string; description: string }
) => {
  try {
    const response = await axios.put(`${API_URL}/bike-status/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBikeStatus = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/bike-status/${id}`);
  } catch (error) {
    throw error;
  }
};
