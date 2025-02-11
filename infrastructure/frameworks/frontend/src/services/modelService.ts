import axios from "axios";
import Model from "@/domain/entities/Model";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createModel = async (data: Model) => {
  try {
    const response = await axios.post(`${API_URL}/model`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllModels = async () => {
  try {
    const response = await axios.get(`${API_URL}/model`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getModelById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/model/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getModelByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/model/${name}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du modèle", error);
    throw error;
  }
};

export const getModelByLink = async (link: string) => {
  try {
    const response = await axios.get(`${API_URL}/model/link/${link}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du modèle", error);
    throw error;
  }
};

export const updateModel = async (
  id: string,
  data: {
    name: string;
    maintenance_mileage_alert: number;
    maintenance_period_alert: number;
    top_case: number;
    seat: number;
    transmission_type: string;
    brand_id: string;
    bike_category_id: string;
  }
) => {
  try {
    console.log("data service", data);
    const response = await axios.put(`${API_URL}/model/${id}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteModelService = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/model/${id}`);
  } catch (error) {
    throw error;
  }
};
