import { LOAD_GOOGLE_OAUTH, ON_AUTH_CHANGE, SIGN_IN, SIGN_OUT } from './types';

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
