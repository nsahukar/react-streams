import React from 'react';

const CreateSVG = () => {
	return (
		<div className="create action" style={{
				width:"56px", 
				height:"56px",
				padding: "4px",
				borderRadius: "28px",
				cursor: "pointer"
		}}>
			<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
		</div>
	);
};

export default CreateSVG;
