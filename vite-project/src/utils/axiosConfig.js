import axios from "axios";

const instance = axios.create({
  baseURL: "https://iinvoice-node.netlify.app/.netlify/functions/api",
});

export default instance;
