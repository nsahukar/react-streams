import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { createStream } from '../../actions';

class StreamCreate extends React.Component {
	renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="error">{error}</div>
			);
		}
	};

	renderInput = ({ input, meta, label }) => {
		return (
			<div className="field">
				{this.renderError(meta)}
				<input type="text" {...input} />
				<label>{label}</label>
			</div>
		);
	};

	onFormSubmit = (values) => {
		this.props.createStream(values);
	};

	render() {
		return (
			<React.Fragment>
				<h2 className="page-title">Create new stream...</h2>
				<form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
					<Field name="title" label="Title" component={this.renderInput} />
					<Field name="description" label="Description" component={this.renderInput} />
					<button>Submit</button>
				</form>
			</React.Fragment>
		);
	}
};

const validate = ({ title, description }) => {
	const error = {};

	if (!title) {
		error.title = 'You must enter a title';
	}

	if (!description) {
		error.description = 'You must enter a description';
	}

	return error;
};

const formWrapped = reduxForm({
	form: 'streamCreate',
	validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
