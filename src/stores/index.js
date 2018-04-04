import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import AppUser from '../reducers/AppUser';
export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
  );
  return createStore(
    combineReducers({
      AppUser,
    }),
    enhancer);
}