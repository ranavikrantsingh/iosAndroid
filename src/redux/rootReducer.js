import {combineReducers} from 'redux';
import appReducer from './reducers/reducers';
const rootReducer = combineReducers({
  appReducer: appReducer,
});

export default rootReducer;
