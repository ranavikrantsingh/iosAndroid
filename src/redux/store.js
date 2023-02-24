
// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistStore, persistReducer} from 'redux-persist';

// import appReducer from './rootReducer';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };
// const rootReducer = combineReducers({
//   appReducer: persistReducer(persistConfig, appReducer),
// });
// export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const persistor = persistStore(store);
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import appReducer from './rootReducer';
import loggerMiddleware from './middleware/logger';
import monitorReducersEnhancer from './enhancers/monitorReducerEnhancer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [loggerMiddleware, thunk],
  enhancers: [monitorReducersEnhancer],
});

export const persistor = persistStore(store);
