import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './AuthReducer';
import AuthChangeReducer from './AuthChangeReducer';

export default combineReducers({
	auth: AuthReducer,
	user: AuthChangeReducer,
	form: formReducer
});
