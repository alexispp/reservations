import { API } from "./api";

export const getCeremonies = async () => {
  try {
    const response = await API.get(`/ceremony`);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addCeremony = async (ceremony) => {
  try {
    const response = await API.post(`/ceremony`, ceremony);
    return response;
  } catch (error) {
    console.log(error);
    return "";
  }
};
