import { STATUS_CREATE_STREAM } from '../actions/types';

const INITIAL_STATE = {
	createStream: null,
	getStreams: null,
	getStream: null,
	editStream: null,
	deleteStream: null
};

const ErrorsReducer = (errors = INITIAL_STATE, action) => {
	switch(action.type) {
		case STATUS_CREATE_STREAM:
			return { ...errors, createStream: action.payload };
		default:
			return errors;
	}
};

export default ErrorsReducer;
