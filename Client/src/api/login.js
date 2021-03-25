import { API } from "./api";

export const login = async (credentials) =>
  await API.post(`/auth`, credentials);
