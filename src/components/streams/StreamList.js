import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getStreams } from '../../actions';
import CreateSVG from './CreateSVG';
import VideoSVG from './VideoSVG';
import PlaySVG from './PlaySVG';
import EditSVG from './EditSVG';
import DeleteSVG from './DeleteSVG';
import './StreamList.css';

class StreamList extends React.Component {
	componentDidMount = () => {
		this.props.getStreams();
	};

	renderCreateStreamAction = () => {
		if (this.props.isSignedIn) {
			return (
				<Link to="/streams/new">
					<CreateSVG />
				</Link>
			);
		}
	};

	trimDescription = (desc, length) => {
		return desc.length > length ?
			desc.substring(0, length - 3) + '...' :
			desc;
	};

	renderUserStreamActions = stream => {
		if (stream.userId === this.props.currentUserId) {
			return (
				<React.Fragment>
					<Link to={`/streams/edit/${stream.id}`}>
						<EditSVG />
					</Link>
					<Link to={`/streams/delete/${stream.id}`}>
						<DeleteSVG />
					</Link>
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
						<Link to={`/streams/show/${stream.id}`}>
							{stream.title}
						</Link>
						<PlaySVG />
					</div>
					<div className="description">
						{stream.description}
					</div>
					<div className="options">
						{this.renderUserStreamActions(stream)}
					</div>
				</div>
			);
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className="top">
					<h2 className="page-title">Streams...</h2>
					{this.renderCreateStreamAction()}
				</div>
				<div className="streams">
					{this.renderList()}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		isSignedIn: state.user.isSignedIn,
		currentUserId: state.user.info ? state.user.info.id : 0,
		streams: Object.values(state.streams)
	};
};

export default connect(mapStateToProps, { getStreams })(StreamList);
