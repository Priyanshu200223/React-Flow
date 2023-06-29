import axios from "axios";

const instance = axios.create({
  withCredentials: true // for pushing client-cookies in all requests to server
});

export default instance;
