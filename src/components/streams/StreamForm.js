import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
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

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
				<Field name="title" label="Title" component={this.renderInput} />
				<Field name="description" label="Description" component={this.renderInput} />
				<button>Submit</button>
			</form>
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

export default reduxForm({
	form: 'streamForm',
	validate
})(StreamForm);
