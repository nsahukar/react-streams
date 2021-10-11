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
	DELETE_STREAM
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

export const createStream = stream => async (dispatch, getState) => {
	const userId = getState().user.info.id;
	const { data } = await streams.post('/streams', { ...stream, userId });
	dispatch({
		type: CREATE_STREAM,
		payload: data
	});
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
