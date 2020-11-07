import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from '../reducers/AppReducer'

const middleware = [thunk];
const initialState = {};

const composedEnhancers = compose(
  applyMiddleware(...middleware),
);

const store = createStore(AppReducer, initialState, composedEnhancers);

export default store;
