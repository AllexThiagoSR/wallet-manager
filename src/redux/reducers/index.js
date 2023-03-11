import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import edit from './edit';

export default combineReducers({ user, wallet, edit });
