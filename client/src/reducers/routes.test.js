import routes from './routes';
import {SET_ROUTES} from '../actions/types';


it('should return empty state if action do not match', function () {
  expect(routes(undefined, {})).toMatchObject([]);
});

it('should return payload if action passed', function () {
  const action = {type: SET_ROUTES, payload: [1,2,3]};
  expect(routes(undefined, action)).toMatchObject(action.payload)
});

it('should return state if state passed', function () {
  const state = [1,2,3,4,5];
  expect(routes(state, {})).toMatchObject(state)
});

it('should update state if payload passed', function () {
  const state = [1,2,3,4,5];
  const action = {type: SET_ROUTES, payload: [1,2,3]};
  expect(routes(state, action)).toMatchObject(action.payload);
});