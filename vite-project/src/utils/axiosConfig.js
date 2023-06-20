import axios from "axios";

const instance = axios.create({
  baseURL: "https://invoice-server.netlify.app/.netlify/functions/api",
});

export default instance;
