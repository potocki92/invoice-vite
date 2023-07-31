import axios from "axios";

const instance = axios.create({
  baseURL: "https://incom-fff0742e5ae9.herokuapp.com/",
});

export default instance;
