import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './AuthReducer';
import AuthChangeReducer from './AuthChangeReducer';
import StreamsReducer from './StreamsReducer';

export default combineReducers({
	auth: AuthReducer,
	user: AuthChangeReducer,
	streams: StreamsReducer,
	form: formReducer
});
