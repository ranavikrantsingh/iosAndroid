import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import appReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  partnerReducer: persistReducer(persistConfig, appReducer),
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
