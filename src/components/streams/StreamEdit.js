import React from 'react';
import { connect } from 'react-redux'

import StreamForm from './StreamForm';
import { 
	getStream, 
	editStream,
	setEditStreamStatus
} from '../../actions';

class StreamEdit extends React.Component {
	componentDidMount = () => {
		this.props.getStream(this.props.match.params.id);
	};

	componentDidUpdate = () => {
		const api = this.props.apiEditStream;
		if (api) {
			if (api.status === 'success') {
				this.props.history.goBack();
			}
		}
	};

	onFormSubmit = values => {
		this.props.editStream(
			this.props.match.params.id,
			values
		);
	}
	
	renderForm = () => {
		if (this.props.stream) {
			const { title, description } = this.props.stream;
			return (
				<StreamForm 
					initialValues={{ title, description }} 
					onSubmit={this.onFormSubmit} 
				/>
			);
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className="top">
					<h2 className="page-title">Edit stream...</h2>
				</div>
				{this.renderForm()}
			</React.Fragment>
		);
	}

	componentWillUnmount = () => {
		this.props.setEditStreamStatus(null);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
		apiEditStream: state.api.editStream
	};
};

export default connect(mapStateToProps, { 
	getStream, 
	editStream,
	setEditStreamStatus
})(StreamEdit);
