import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import AuthChangeReducer from './AuthChangeReducer';

export default combineReducers({
	auth: AuthReducer,
	user: AuthChangeReducer,
});
