import {SET_MESSAGE} from "../actions/types";


class ErrorHandler {

  constructor(store) {
    this.store = store
  }

  handleError = (message) => {
    /**
     * Set default error message
     */
    this.store.dispatch({
      type: SET_MESSAGE,
      payload: {error: message}});
  };

  handleServerMessage = e => {
    /**
     * Set server error message, if status code 404
     * redirect user to not found page
     */
    this.store.dispatch({type: SET_MESSAGE, payload: {error: e.data.error}});
  };

  handleBadRequestError = e => {
    /**
     * Handle bad request status codes (4xx)
     */
    if (e && e.data) this.handleServerMessage(e);
    else this.handleError(this.store.getState().config.errors.connection);
  };

  errorHandle = e => {
    /**
     * Handling errors from the server response. If server is not available,
     * or there is not Internet connection, or remote server has a bug,
     * raise an error.
     *
     * @return: null
     */

    const err = e.response && e.response.status >= 400 && e.response.status < 500;
    if (!err) this.handleError(this.store.getState().config.errors.connection);
    else this.handleBadRequestError(e.response);

    return null;
  };
}


export default ErrorHandler;