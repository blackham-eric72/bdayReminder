import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import birthdayReducer from './birthdayReducer';
import bdayReducer from './bdayReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  birthday: birthdayReducer,
  bday: bdayReducer
});
