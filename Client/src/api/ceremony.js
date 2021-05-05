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

export const getAllCeremonies = async () => {
  try {
    const response = await API.get(`/ceremony/all`);
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


export const getLastCeremony = async ()=>{
  try {
    const response = await API.get(`/ceremony/lastCeremony`);
    return response;
  } catch (error) {
    console.log(error);
    return "";
  }
}

export const getAvailableTimes = async(id)=>{
  try {
    console.log(`/ceremony/${id}/availableTimes`)
    const response = await API.get(`/ceremony/${id}/availableTimes`);
    return response;
  } catch (error) {
    console.log(error);
    return "";
  }

}