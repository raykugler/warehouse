import {applyMiddleware, compose, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      ReduxThunk,
    )
  )
);

export {store};