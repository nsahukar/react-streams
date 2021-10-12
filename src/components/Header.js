import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';
import './Header.css';

const Header = () => {
	return (
		<div className="header">
			<Link to="/" className="brand">&lt;strmy&gt;</Link>
			<ul className="nav-items">
				<li className="nav-item">
					<Link to="/"></Link>
				</li>
			</ul>
			<div className="sign-in-out">
				<GoogleAuth />
			</div>
		</div>
	);
};

export default Header;
