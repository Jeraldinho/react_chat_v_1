import React, { useEffect, useState } from "react";
import { useData } from "../DataContext";

const Form = (props) => {
	// Получаем данные из контекста
	const {
		messages,
		setMessages,
		fieldsInit,
		fields,
		setFormData,
	} = useData();

	// Form validation
	const messageTextErrorInit = !!fieldsInit.text
		? ""
		: "This is a required field";
	const [messageTextTouched, setMessageTextTouched] = useState(false);
	const [messageTextError, setMessageTextError] = useState(
		messageTextErrorInit
	);

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
		setMessageTextError(messageTextErrorInit);
	}, [messages, messageTextErrorInit]);

	/**
	 * Изменение текста сообщения
	 * @param {e} e - объект события Event для предотвращения default поведения формы
	 */
	const onChangeMessageText = (e) => {
		if (e.target.value.length < 1) {
			setMessageTextError("This is a require field");
		} else if (e.target.value.length > 0 && e.target.value.length < 2) {
			setMessageTextError("Must be more than 1 characters");
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
			fields.id = messages[messages.length - 1].id + 1;
		} else {
			fields.id = 1;
		}

		setMessages([...messages, fields]);

		setFormData({
			...fields,
			...fieldsInit,
		});

		setMessageTextTouched(false);
	};

	return (
		<form className="write-message-form" onSubmit={handleSubmit}>
			{messageTextTouched && messageTextError && (
				<div className="error-message">{messageTextError}</div>
			)}
			<textarea
				name="message_text"
				id="message_text"
				rows="1"
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
	);
};

export default Form;
