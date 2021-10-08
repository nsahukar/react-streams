import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadGoogleOAuth2, onAuthChange } from '../actions';

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
			<BrowserRouter>
			<div>
			<Header />
			<Route path="/" exact component={StreamList} />
			<Route path="/streams/new" exact component={StreamCreate} />
			<Route path="/streams/edit" exact component={StreamEdit} />
			<Route path="/streams/delete" exact component={StreamDelete} />
			<Route path="/streams/show" exact component={StreamShow} />
			</div>
			</BrowserRouter>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.dir(state);
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { 
	loadGoogleOAuth2, 
	onAuthChange
})(App);
