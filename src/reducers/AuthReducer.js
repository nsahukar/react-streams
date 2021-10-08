import { LOAD_GOOGLE_OAUTH } from '../actions/types';

const AuthReducer = (auth = null, action) => {
	switch(action.type) {
		case LOAD_GOOGLE_OAUTH:
			return action.payload;
		default:
			return auth;
	}
};

export default AuthReducer;
