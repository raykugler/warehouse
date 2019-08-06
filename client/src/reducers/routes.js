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

// -an action holds the new data that needs to be dealt with;
// -a reducer takes the existing data plus the new data and does whatever needs to be done.
// -combineReducers groups the reducers together so that an action can be sent to all of them at once.
// -store is where all of the data lives 
// -store.dispatch sends our action to the combinedReducers.