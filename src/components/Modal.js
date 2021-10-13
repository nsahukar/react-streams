import React from 'react';
import ReactDOM from 'react-dom';

import CloseSVG from './svg/CloseSVG';
import './Modal.css';

const Modal = props => {
	const show = props.show ? 'modal fade show' : 'modal fade';
	return ReactDOM.createPortal(
		<div onClick={props.onDismiss} className={show}>
			<div onClick={e => e.stopPropagation()} className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h3>{props.title}</h3>
						<CloseSVG onClick={props.onDismiss} />
					</div>
					<div className="divider" />
					<div className="modal-body">
						<p>{props.content}</p>
					</div>
					<div className="divider" />
					<div className="modal-footer">
						{props.actions}
					</div>
				</div>
			</div>
		</div>, 
		document.getElementById('modal')
	);
};

export default Modal;
