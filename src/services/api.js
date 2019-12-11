import axios from "axios";

const api = axios.create({
  baseURL: "http://fleemasys-api.herokuapp.com/"
});

export default api;
