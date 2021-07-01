import React from "react";

const Message = (props) => {
	return (
		<div className="message">
			<div className="message__user-name">{props.author}</div>

			<p>{props.text}</p>
		</div>
	);
};

export default Message;
