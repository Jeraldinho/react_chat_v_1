import React from "react";

/**
 * Компонент сообщения
 * @component
 * @param {*} props
 * @param {string} props.author - Автор сообщения
 * @param {string} props.text - Текст сообщения
 */

const Message = (props) => {
	return (
		<div className="message">
			<div className="message__user-name">{props.author}</div>

			<p>{props.text}</p>
		</div>
	);
};

export default Message;
