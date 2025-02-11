import axios from "axios";
import Brand from "@/domain/entities/Brand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createBrand = async (data: Brand) => {
  try {
    const response = await axios.post(`${API_URL}/brands`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllBrands = async () => {
  try {
    const response = await axios.get(`${API_URL}/brands`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBrandById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/brands/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBrandByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/brands/${name}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la marque", error);
    throw error;
  }
};

export const getBrandByLink = async (link: string) => {
  try {
    const response = await axios.get(`${API_URL}/brands/link/${link}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de la marque", error);
    throw error;
  }
};

export const updateBrand = async (
  id: string,
  data: { name: string; description: string }
) => {
  try {
    console.log("data service", data);
    const response = await axios.put(`${API_URL}/brands/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBrandService = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/brands/${id}`);
  } catch (error) {
    throw error;
  }
};
