import React from 'react';
import { connect } from 'react-redux'

import { getStream } from '../../actions';

class StreamEdit extends React.Component {
	componentDidMount = () => {
		this.props.getStream(this.props.match.params.id);
	};

	render() {
		return (
			<div>StreamEdit</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
};

export default connect(mapStateToProps, { getStream })(StreamEdit);
