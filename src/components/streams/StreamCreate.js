import React from 'react';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';
import { createStream, setCreateStreamStatus } from '../../actions';

class StreamCreate extends React.Component {
	componentDidUpdate = () => {
		const api = this.props.apiCreateStream;
		if (api) {
			if (api.status === 'success') {
				this.props.history.goBack();
			}
		}
	};

	onFormSubmit = (values) => {
		this.props.createStream(values);
	};

	render() {
		return (
			<React.Fragment>
				<div className="top">
					<h2 className="page-title">Create new stream...</h2>
				</div>
				<StreamForm onSubmit={this.onFormSubmit} />
			</React.Fragment>
		);
	}

	componentWillUnmount = () => {
		this.props.setCreateStreamStatus(null);
	};
};

const mapStateToProps = state => {
	return {
		apiCreateStream: state.api.createStream
	};
};

export default connect(mapStateToProps, { createStream, setCreateStreamStatus })(StreamCreate);
