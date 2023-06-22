import axios from "axios";

const instance = axios.create({
  baseURL: "https://tender-ring-bee.cyclic.app/",
});

export default instance;
