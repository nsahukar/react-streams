import { 
	STATUS_CREATE_STREAM, 
	STATUS_EDIT_STREAM,
	STATUS_DELETE_STREAM
} from '../actions/types';

const INITIAL_STATE = {
	createStream: null,
	getStreams: null,
	getStream: null,
	editStream: null,
	deleteStream: null
};

const StatusReducer = (errors = INITIAL_STATE, action) => {
	switch(action.type) {
		case STATUS_CREATE_STREAM:
			return { ...errors, createStream: action.payload };
		case STATUS_EDIT_STREAM:
			return { ...errors, editStream: action.payload };
		case STATUS_DELETE_STREAM:
			return { ...errors, deleteStream: action.payload };
		default:
			return errors;
	}
};

export default StatusReducer;
