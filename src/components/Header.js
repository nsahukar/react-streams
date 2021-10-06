import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
	return (
		<div className="header">
			<Link to="/" className="brand">&lt;strmy&gt;</Link>
			<ul className="nav-items">
				<li className="nav-item">
					<Link to="/">Streams</Link>
				</li>
				<li className="nav-item">
					<Link to="">Login</Link>
				</li>
			</ul>
		</div>
	);
};

export default Header;
