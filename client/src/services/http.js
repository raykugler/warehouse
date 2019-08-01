
import axios from "axios";
import {store} from "../loader";
import ErrorHandler from "./errorsHandlers";

const errorHandler = new ErrorHandler(store);
function setJwt (jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const setBaseURL = url => axios.defaults.baseURL = url;

axios.defaults.baseURL = store.getState().config.api;
axios.interceptors.response.use(null, errorHandler.errorHandle);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  create: axios.create,
  setBaseURL,
  setJwt
};