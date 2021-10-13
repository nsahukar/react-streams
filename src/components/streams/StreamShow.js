import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';

import { getStream } from '../../actions';
import VideoSVG from '../svg/VideoSVG';

class StreamShow extends React.Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	componentDidMount = () => {
		this.props.getStream(this.props.match.params.id);
		this.buildPlayer();
	};

	componentDidUpdate = () => {
		this.buildPlayer();
	};

	buildPlayer = () => {
		if (this.flvPlayer || !this.props.stream) {
			return;
		}
		
		const { id } = this.props.match.params;
		this.flvPlayer = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${id}.flv`
		});
		this.flvPlayer.attachMediaElement(this.videoRef.current);
		this.flvPlayer.load();
	};

	render() {
		if (!this.props.stream) {
			return (
				<div className="top">
					<h2 className="page-title">Loading...</h2>
				</div>
			);
		}

		const { title, description } = this.props.stream;
		return (
			<React.Fragment>
				<video ref={this.videoRef} style={{ 
						width: '100%',
						marginBottom: '1rem',
						backgroundColor: '#333'
				}} controls />
				<div className="stream">
					<div className="icon">
						<VideoSVG />
					</div>
					<div className="title">
							{title}
					</div>
					<div className="description">
						{description}
					</div>
				</div>
			</React.Fragment>
		);
	}

	componentWillUnmount = () => {
		this.flvPlayer.destroy();
	};
}

const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id]
	};
}

export default connect(mapStateToProps, { getStream })(StreamShow);
