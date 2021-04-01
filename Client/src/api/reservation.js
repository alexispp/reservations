import { API } from "./api";

export const getReservations = async () => {
  try {
    const response = await API.get(`/reservation`);
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
