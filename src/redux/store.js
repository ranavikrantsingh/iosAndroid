// import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
// import monitorReducersEnhancer from './enhancers/monitorReducerEnhancer';
// import loggerMiddleware from './middleware/logger';
// import appReducer from './rootReducer';
// import {loadState, saveState} from './storage';

// export default function configureAppStore() {
//   const store = configureStore({
//     reducer: appReducer,
//     middleware: [loggerMiddleware, ...getDefaultMiddleware()],
//     preloadedState: loadState(),
//     enhancers: [monitorReducersEnhancer],
//   });

//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./rootReducer', () => store.replaceReducer(appReducer));
//   }
//   store.subscribe(() => {
//     saveState(store.getState());
//   });
//   return store;
// }

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import appReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  appReducer: persistReducer(persistConfig, appReducer),
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
