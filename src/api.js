import axios from "axios";

const useApi = axios.create({
  baseURL: "https://dummyapi.io/data/v1",
  headers: {
    "app-id": import.meta.env.VITE_APP_ID
  }
});

export default useApi;
