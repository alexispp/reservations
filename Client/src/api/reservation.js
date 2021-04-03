import { API } from "./api";

export const getReservations = async (ceremonyId) => {
  try {
    const response = await API.post(`/reservation`, ceremonyId);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addReservation = async (reservation) => {
  try {
    const response = await API.post(`/reservation`, reservation);
    return response;
  } catch (error) {
    console.log(error);
    return "";
  }
};
