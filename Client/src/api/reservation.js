import { API } from "./api";

export const addReservation = async (reservation) =>
  await API.post(`/reservation`, reservation);
