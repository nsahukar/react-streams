import {
	CREATE_STREAM,
	GET_STREAMS,
	GET_STREAM,
	EDIT_STREAM,
	DELETE_STREAM
} from '../actions/types';

const StreamsReducer = (streams = {}, action) => {
	switch(action.type) {
		case CREATE_STREAM:
		case GET_STREAM:
		case EDIT_STREAM: {
			return { ...streams, [action.payload.id]: action.payload };
		}
		case GET_STREAMS: {
			const newStreams = {};
			action.payload.forEach(stream => newStreams[stream.id] = stream);
			return newStreams;
		}
		case DELETE_STREAM: {
			const newStreams = { ...streams };
			delete newStreams[action.payload];
			return newStreams;
		}
		default:
			return streams;
	}
};

export default StreamsReducer;
