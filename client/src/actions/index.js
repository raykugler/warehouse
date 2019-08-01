import http from '../services/http';
import * as types from "./types";


const get = (url, dispatch, type) => http.get(url)
  .then(res => {
    if (res && res.data)
      return dispatch({type: type, payload: res.data});
    else return null;
  });

export const getRoutes = url => dispatch => get(url, dispatch, types.SET_ROUTES);