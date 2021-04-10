import { API } from "./api";

export const getReservations = async (ceremonyId) => {
  try {
    const response = await API.post(`/reservation/getAllByCeremony`, {ceremonyId});
    return response;
  } catch (error) {
    console.log(error.response);
    return [];
  }
};

export const addReservation = async (reservation) => {
  try {
    const response = await API.post(`/reservation`, reservation);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
