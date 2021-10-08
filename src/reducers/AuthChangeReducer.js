import { ON_AUTH_CHANGE } from '../actions/types';

const INITIAL_STATE = {
	isSignedIn: null,
	info: null
};

const AuthChangeReducer = (user = INITIAL_STATE, action) => {
	switch(action.type) {
		case ON_AUTH_CHANGE:
			return action.payload;
		default:
			return user;
	}
};

export default AuthChangeReducer;
