import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import AppUser from '../reducers/AppUser';
import AppInfo from '../reducers/AppInfo';
import ProductsList from '../reducers/ProductsList';
import ProductShow from '../reducers/ProductShow';
import OrderShow from '../reducers/OrderShow';
import AppCart from '../reducers/AppCart';
import AppMsg from '../reducers/AppMsg';
import UserContacts from '../reducers/UserContacts';
import UserMoney from '../reducers/UserMoney';
import UserBankcards from '../reducers/UserBankcards';
export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
  );
  return createStore(
    combineReducers({
      AppInfo,
      ProductsList,
      AppUser,
      ProductShow,
      AppCart,
      OrderShow, 
      UserContacts,
      AppMsg,
      UserMoney,
      UserBankcards,
      
    }),
    enhancer);
}