import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadGoogleOAuth2, onAuthChange } from '../actions';

import history from '../history';
import Header from '../components/Header';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import './App.css';

class App extends React.Component {
	componentDidMount = () => {
		this.props.loadGoogleOAuth2();
	};

	componentDidUpdate = () => {
		if (this.props.auth) {
			this.props.auth.isSignedIn.listen(this.onAuthChange);
		}
	};

	onAuthChange = isSignedIn => {
		this.props.onAuthChange(isSignedIn);
	}

	render() {
		return (
			<div className="app">
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path="/" exact component={StreamList} />
						<Route path="/streams/new" exact component={StreamCreate} />
						<Route path="/streams/edit/:id" exact component={StreamEdit} />
						<Route path="/streams/delete/:id" exact component={StreamDelete} />
						<Route path="/streams/:id" exact component={StreamShow} />
					</Switch>
				</div>
			</Router>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { 
	loadGoogleOAuth2, 
	onAuthChange
})(App);
