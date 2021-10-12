import streams from '../apis/streams';
import { 
	LOAD_GOOGLE_OAUTH, 
	ON_AUTH_CHANGE, 
	SIGN_IN, 
	SIGN_OUT,
	CREATE_STREAM,
	GET_STREAMS,
	GET_STREAM,
	EDIT_STREAM,
	DELETE_STREAM,
	STATUS_CREATE_STREAM
} from './types';

export const loadGoogleOAuth2 = () => dispatch => {
	window.gapi.load('client:auth2', () => {
		window.gapi.client.init({
			clientId: '703694730097-rgi6ebsusshtcco3hkfggfgqteq5u08v.apps.googleusercontent.com',
			scope: 'email',
		}).then(() => {
			const auth = window.gapi.auth2.getAuthInstance();
			// auth.isSignedIn.listen(onAuthChange);
			dispatch({
				type: LOAD_GOOGLE_OAUTH,
				payload: auth
			});
			dispatch(onAuthChange(auth.isSignedIn.get()));
		});
	});
};

export const onAuthChange = isSignedIn => (dispatch, getState) => {
	let userInfo = null;
	if (isSignedIn) {
		const userProfile = getState().auth.currentUser.get().getBasicProfile();
		userInfo = {
			id: userProfile.getId(),
			email: userProfile.getEmail(),
			name: userProfile.getName(),
			imageUrl: userProfile.getImageUrl()
		};
	}
	dispatch({
		type: ON_AUTH_CHANGE,
		payload: {
			isSignedIn: isSignedIn,
			info: userInfo
		}
	});
};

export const signIn = () => (dispatch, getState) => {
	getState().auth.signIn().then(() => {
		dispatch({
			type: SIGN_IN
		});
	});
};

export const signOut = () => (dispatch, getState) => {
	getState().auth.signOut().then(() => {
		dispatch({
			type: SIGN_OUT
		});
	});
};


const logAxiosError = (error) => {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		console.log(error.response.data);
		console.log(error.response.status);
		console.log(error.response.headers);
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser
		console.log(error.reuqest);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error:', error.message);
	}
};

export const createStream = stream => async (dispatch, getState) => {
	const userInfo = getState().user.info;
	const userId = userInfo ? userInfo.id : 0;
	const response = await streams.post('/streams', { ...stream, userId })
																.catch(logAxiosError);
	if (response) {
		dispatch({
			type: CREATE_STREAM,
			payload: response.data
		});
		dispatch(setCreateStreamStatus({
			status: 'success'
		}));
	}
};

export const setCreateStreamStatus = status => {
	return {
		type: STATUS_CREATE_STREAM,
		payload: status
	};
};

export const getStreams = () => async dispatch => {
	const { data } = await streams.get('/streams');
	dispatch({
		type: GET_STREAMS,
		payload: data
	});
};

export const getStream = id => async dispatch => {
	const { data } = await streams.get(`/streams/${id}`);
	dispatch({
		type: GET_STREAM,
		payload: data
	});
};

export const editStream = stream => async dispatch => {
	const { data } = await streams.put(`/streams/${stream.id}`, stream);
	dispatch({
		type: EDIT_STREAM,
		payload: data
	});
}

export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`);
	dispatch({
		type: DELETE_STREAM,
		payload: id
	});
};
