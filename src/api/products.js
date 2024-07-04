import { API_URLS } from "../constants/api-urls";
import { apiService } from "../services/Api";

export const createProductApi = (data) => {
  return apiService.post(`${API_URLS.products}`, data);
};

export const getProductsApi = () => {
  return apiService.get(`${API_URLS.products}`);
};

export const getProductApi = (id) => {
  return apiService.get(`${API_URLS.products}/${id}`);
};

export const patchProductApi = (productId, data) => {
  return apiService.patch(`${API_URLS.products}/${productId}`, data);
};

export const deleteProductApi = (productId) => {
  return apiService.delete(`${API_URLS.products}/${productId}`);
};
