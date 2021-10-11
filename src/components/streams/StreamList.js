import React from 'react';
import { connect } from 'react-redux';

import { getStreams } from '../../actions';
import VideoSVG from './VideoSVG';
import PlaySVG from './PlaySVG';
import EditSVG from './EditSVG';
import DeleteSVG from './DeleteSVG';
import './StreamList.css';

class StreamList extends React.Component {
	componentDidMount = () => {
		this.props.getStreams();
	};

	trimDescription = (desc, length) => {
		return desc.length > length ?
			desc.substring(0, length - 3) + '...' :
			desc;
	};

	showCurrentUserStreamsOptions = userId => {
		if (userId === this.props.currentUserId) {
			return (
				<React.Fragment>
					<EditSVG />
					<DeleteSVG />
				</React.Fragment>
			);
		}
	};

	renderList = () => {
		return this.props.streams.map(stream => {
			return (
				<div className="stream" key={stream.id}>
					<div className="icon">
						<VideoSVG />
					</div>
					<div className="title">
						{stream.title}
						<PlaySVG />
					</div>
					<div className="description">
						{stream.description}
					</div>
					<div className="options">
						{this.showCurrentUserStreamsOptions(stream.userId)}
					</div>
				</div>
			);
		});
	};

	render() {
		return (
			<React.Fragment>
				<h2 className="page-title">Streams...</h2>
				<div className="streams">
					{this.renderList()}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		streams: Object.values(state.streams),
		currentUserId: state.user.info.id
	};
};

export default connect(mapStateToProps, { getStreams })(StreamList);
