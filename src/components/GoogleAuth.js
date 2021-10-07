import React from 'react';
import './GoogleAuth.css';

class GoogleAuth extends React.Component {
	state = { isSignedIn: null };

	componentDidMount = () => {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '703694730097-rgi6ebsusshtcco3hkfggfgqteq5u08v.apps.googleusercontent.com',
				scope: 'email',
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.setState({ isSignedIn: this.auth.isSignedIn.get() })
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	};

	onAuthChange = () => {
			this.setState({ isSignedIn: this.auth.isSignedIn.get() })
	};

	renderAuthButton = () => {
		if (this.state.isSignedIn === null) {
			return null;
		} else if (this.state.isSignedIn) {
			return (
				<span 
					role="button" 
					className="sign-out-btn"
					onClick={() => this.auth.signOut()}
				>
					Sign Out
				</span>
			);
		} else {
			return (
				<span 
					role="button" 
					className="g-sign-in-btn"
					onClick={() => this.auth.signIn()}
				/>
			);
		}
	};
	
	render() {
		return (
			<React.Fragment>
				{this.renderAuthButton()}
			</React.Fragment>
		);
	}
}

export default GoogleAuth;
