import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useRef } from "react";
import Form from "./components/Form";
import { useData } from "./DataContext";
import Message from "./components/Message";

/**
 * Главный компонент App
 * @component
 * @property {Array} messages - Массив сообщений
 */

function App() {
	/** Получение данных из контекста */
	const { messages } = useData();

	/** Создаем ref контейнера сообщений */
	const messagesCnt = useRef();

	/** Скролл вниз контейнера сообщений при изменении стейта сообщений */
	useEffect(() => {
		messagesCnt.current.scrollTop = messagesCnt.current.scrollHeight;
	}, [messages]);

	return (
		<div className="App">
			<header className="header">
				<img src={logo} className="App-logo" width="60" alt="logo" />
				<h1>React Chat V.1</h1>
			</header>

			<div className="messages-block" ref={messagesCnt}>
				<div className="messages">
					{!messages.length ? <span className="no-messages">No messages yet...</span> : ''}

					{
						messages && (
							messages.map((message) => {
								return (
									<Message
										{...message}
										key={`message_${message.id}`}
									/>
								);
							})
						)
					}
					
				</div>
			</div>

			<div className="write-message-block">
				<div className="title">Enter your messages</div>

				<Form />

				<a href="https://github.com/Jeraldinho" rel="noreferer" className="copyright" target="_blank">https://github.com/Jeraldinho</a>
			</div>
		</div>
	);
}

export default App;
