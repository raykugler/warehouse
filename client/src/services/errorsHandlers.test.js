import configureMockStore from 'redux-mock-store';
import ErrorHandler from './errorsHandlers';
import * as  types from '../actions/types';
import thunk from "redux-thunk";


describe('errorsHandlers', () => {

  let action;
  const createMockStore = configureMockStore([thunk]);
  const state = {
    config: {
      errors: {
        connection: "test error message"
      }
    }
  };
  const mockStore = createMockStore(state);
  const errorHandler = new ErrorHandler(mockStore);

  afterEach(() => {
    mockStore.clearActions();
  });

  it('should add message to the store', function () {
    action = {
      type: types.SET_MESSAGE,
      payload: {error: "test error message"}
    };
    errorHandler.handleError(state.config.errors.connection);
    expect(mockStore.getActions()).toMatchObject([action]);
  });

  it('should add server error to the store', function () {
    const err = {data: {error: "test server error message"}};
    action = {
      type: types.SET_MESSAGE,
      payload: err.data
    };

    errorHandler.handleServerMessage(err);
    expect(mockStore.getActions()).toMatchObject([action]);
  });

  describe('server response', () => {
    const err = {data: "test server error message"};

    jest.spyOn(errorHandler, 'handleError');
    jest.spyOn(errorHandler, 'handleServerMessage');

    beforeEach(() => {
      errorHandler.handleError.mockClear();
      errorHandler.handleServerMessage.mockClear();
    });

    it('should call handleError method', function () {

      // server doesn't return response or empty response
      errorHandler.handleBadRequestError(undefined);
      expect(errorHandler.handleError)
        .toHaveBeenCalledWith(state.config.errors.connection);
      expect(errorHandler.handleServerMessage)
        .not.toHaveBeenCalled();

    });

    it('should call handleServerMessage method', function () {

      // server return error message
      errorHandler.handleBadRequestError(err);
      expect(errorHandler.handleServerMessage)
        .toHaveBeenCalledWith(err);
      expect(errorHandler.handleError)
        .not.toHaveBeenCalled();
    });

    it('should call handleError method', function () {

      // test errorHandle method
      errorHandler.errorHandle({});

      expect(errorHandler.handleError)
        .toHaveBeenCalledWith(state.config.errors.connection);
    });

    it('should call handleBadRequestError', function () {
      const res = {
        response:{
          status: 404,
          body: "error message"
        }};
      jest.spyOn(errorHandler, 'handleBadRequestError');

      errorHandler.errorHandle(res);

      expect(errorHandler.handleBadRequestError)
        .toHaveBeenCalledWith(res.response);
    });
  });
});