import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";

function App() {
	// Исходное состояние сообщений
	const messagesInit = [
		{
			id: 1,
			author: "Anonymous",
			text:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est asperiores possimus nobis explicabo ipsum aliquid, blanditiis obcaecati commodi hic, distinctio mollitia iure. Voluptate illum odio repellendus aperiam quis voluptatem.",
		},
	];

	// Объявление state сообщений
	const [messages, setMessages] = useState(messagesInit);

	// Поля формы по-умолчанию
	const fieldsInit = {
		id: 1,
		author: "Anonymous",
		text: "",
	};

	// Объявление переменной состояния полей формы
	const [fields, setFormData] = useState(fieldsInit);

	// Validation
	const messageTextErrorInit = !!fieldsInit.text ? '' : "This is a required field" 
	const [messageTextTouched, setMessageTextTouched] = useState(false);
	const [messageTextError, setMessageTextError] = useState(messageTextErrorInit);

	// Переменная состояния валидности формы
	const [isFormValid, setFormValid] = useState(false);

	// Обработчик события blur инпутов
	const blurHandler = (e) => {
		switch (e.target.name) {
			case "message_text":
				setMessageTextTouched(true);
				break;
			default:
				break;
		}
	};

	// При изменении состояний ошибок проверяем форму на валидность
	useEffect(() => {
		if (messageTextError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [messageTextError]);

	/*
		После оптравки сообщения, форма очищается, но ошибок также нет, как и перед отправкой и форма остается валидна.
		При изменении messages обновляем состояние ошибок.
	*/
	useEffect(() => {
		setMessageTextError(messageTextErrorInit)
	}, [messages, messageTextErrorInit]);

	/**
	 * Изменение текста сообщения
	 * @param {e} e - объект события Event для предотвращения default поведения формы
	 */
	const onChangeMessageText = (e) => {
		if (e.target.value.length < 1) {
			setMessageTextError("This is a require field");
		} else if (e.target.value.length > 0 && e.target.value.length < 4) {
			setMessageTextError("Must be more than 3 characters");
		} else {
			setMessageTextError("");
		}

		setFormData({
			...fields,
			text: e.target.value,
		});
	};

	/**
	 * Обработчик формы - добавление сообщения в state
	 * @param {e} e - объект события Event для предотвращения default поведения формы
	 * @param {object} fields - Временное хранилище для данных формы
	 * @param {array} messages - Массив сообщений
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		// Назначение поля id добавляемому сообщению
		if (messages.length !== 0) {
			fields.id = messages[0].id + 1;
		} else {
			fields.id = 1;
		}

		setMessages([fields, ...messages]);

		setFormData({
			...fields,
			...fieldsInit,
		});

		setMessageTextTouched(false);
	};

	return (
		<div className="App">
			<header className="header">
				<img src={logo} className="App-logo" width="60" alt="logo" />
				<h1>React Chat V.1</h1>
			</header>

			<div className="container content">
				<div className="row">
					<div className="col-12 col-md-6 messages-block">
						<h2>Messages</h2>

						<div className="messages">
							{messages.map((message) => {
								return (
									<div
										className="message"
										key={`message_${message.id}`}
									>
										<div className="message__user-name">
											{message.author}
										</div>

										<p>{message.text}</p>
									</div>
								);
							})}
						</div>
					</div>

					<div className="col-12 col-md-6 write-message-block">
						<h2>Write your messages</h2>

						<form
							className="write-message-form"
							onSubmit={handleSubmit}
						>
							{messageTextTouched && messageTextError && (
								<div className="error-message">
									{messageTextError}
								</div>
							)}
							<textarea
								name="message_text"
								id="message_text"
								rows="3"
								value={fields.text}
								onChange={onChangeMessageText}
								onBlur={blurHandler}
							></textarea>

							<button
								type="submit"
								className="btn btn-primary"
								disabled={!isFormValid}
							>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
