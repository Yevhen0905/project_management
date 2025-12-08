import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://6932ec81e5a9e342d27152d6.mockapi.io/",
  headers: {
    "Content-Type": "application/json",
  },
});
