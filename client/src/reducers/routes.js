import {SET_ROUTES} from "../actions/types";

const cars = (state = [], action) => {
  switch (action.type) {
    case SET_ROUTES:
      return action.payload;
    default:
      return state;
  }
};

export default cars;