import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';
import './GoogleAuth.css';

class GoogleAuth extends React.Component {
	renderAuthButton = () => {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<span 
					role="button" 
					className="sign-out-btn"
					onClick={() => this.props.signOut()}
				>
					Sign Out
				</span>
			);
		} else {
			return (
				<span 
					role="button" 
					className="g-sign-in-btn"
					onClick={() => this.props.signIn()}
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

const mapStateToProps = state => {
	return {
		isSignedIn: state.user.isSignedIn
	};
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
