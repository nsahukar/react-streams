import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import { 
	getStream,
	deleteStream, 
	setDeleteStreamStatus 
} from '../../actions';

class StreamDelete extends React.Component {
	componentDidMount = () => {
		this.props.getStream(this.props.match.params.id);
	};

	componentDidUpdate = () => {
		const api = this.props.apiDeleteStream;
		if (api) {
			if (api.status === 'success') {
				this.props.history.goBack();
			}
		}
	};

	onClickDelete = () => {
		this.props.deleteStream(this.props.match.params.id);
	};

	renderActions = () => {
		return (
			<React.Fragment>
				<button onClick={() => this.props.history.goBack()} className="secondary">Cancel</button>	
				<button onClick={this.onClickDelete} className="primary">Delete</button>	
			</React.Fragment>
		);
	};

	renderModal = () => {
		if (this.props.stream) {
			return <Modal 
				show 
				title="Delete Stream"
				content={`Are you sure you want to delete "${this.props.stream.title}" stream?`}
				actions={this.renderActions()}
				onDismiss={() => this.props.history.goBack()}
			/>;
		} else {
			return <Modal />
		}
	};

	render() {
		return this.renderModal();
	}

	componentWillUnmount = () => {
		this.props.setDeleteStreamStatus(null);
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
		apiDeleteStream: state.api.deleteStream
	};
};

export default connect(mapStateToProps, {
	getStream,
	deleteStream,
	setDeleteStreamStatus
})(StreamDelete);
