import axios from "axios";

// const requestHandler = (req) => {
//   return req;
// };

// const responseHandler = (res) => {
//   return res ? res.data : res;
// };

// const responseErrorHandler = (err) => {
//   return Promise.reject(err);
// };

export let API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  },
});

// export const setAPI = (token) => {
//   API = axios.create({
//     baseURL: 'http://localhost:3000',
//     headers: {
//       'Content-Type': 'application/json',
//     //   Authorization: `Bearer ${token}`,
//     },
//   });

//   API.interceptors.request.use(requestHandler);
//   API.interceptors.response.use(responseHandler, responseErrorHandler);
// };
