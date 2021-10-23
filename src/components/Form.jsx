import React, { useEffect, useState } from "react";
import { useData } from "../DataContext";
import dateFormat from "dateformat";

/**
 * Компонент формы
 * @component
 * @property {Array} messages - Массив сообщений
 * @property {Object} fieldsInit - Исходные данные полей формы
 * @property {Object} fields - Данные полей формы
 * @property {Function} setFormData - Функция изменения состояния fields
 * @property {Boolean} isFormValid - Валидность формы
 * @property {Boolean} messageTextTouched - Состояние фокуса инпута. Был ли кликнут инпут
 * @property {String} messageTextError - Ошибка поля ввода формы
 */

const Form = () => {
	/**
	 * Получаем данные из контекста
	 */
	const {
		messages,
		fieldsInit,
		fields,
		setFormData,
		firebase,
	} = useData();

	/** Валидация формы */
	const messageTextErrorInit = !!fieldsInit.text
		? ""
		: "This is a required field";
	const [messageTextTouched, setMessageTextTouched] = useState(false);
	const [messageTextError, setMessageTextError] = useState(
		messageTextErrorInit
	);

	/** Переменная состояния валидности формы */
	const [isFormValid, setFormValid] = useState(false);

	/** Обработчик события blur инпутов */
	const blurHandler = (e) => {
		switch (e.target.name) {
			case "message_text":
				setMessageTextTouched(true);
				break;
			default:
				break;
		}
	};

	/** При изменении состояний ошибок проверяем форму на валидность */
	useEffect(() => {
		if (messageTextError) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [messageTextError]);

	/**
	 * После оптравки сообщения, форма очищается, но ошибок также нет,
	 * как и перед отправкой и форма остается валидна.
	 * При изменении messages обновляем состояние ошибок.
	 */
	useEffect(() => {
		setMessageTextError(messageTextErrorInit);
	}, [messages, messageTextErrorInit]);

	/**
	 * Изменение текста сообщения
	 * @param {Event} e - объект события Event для предотвращения default поведения формы
	 */
	const onChangeMessageText = (e) => {
		if (e.target.value.length < 1) {
			setMessageTextError("This is a require field");
		} else if (e.target.value.length > 0 && e.target.value.length < 2) {
			setMessageTextError("Must be more than 1 characters");
		} else {
			setMessageTextError("");
		}

		/**
		 * Заносим данные из textarea в state
		 */
		setFormData({
			...fields,
			text: e.target.value,
		});
	};

	/**
	 * Получение даты и времени
	 * @return 2021-10-23, 06:16:55
	 */
	const getDate = () => {
		const timestamp = firebase.firestore.Timestamp.now().toDate();

		return dateFormat(timestamp, "yyyy-mm-dd, HH:MM:ss")
	}

	/**
	 * Обработчик формы - добавление сообщения в state
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		/**
		 * Назначение поля id добавляемому сообщению
		 */
		if (messages.length !== 0) {
			fields.id = messages[messages.length - 1].id + 1;
		} else {
			fields.id = 1;
		}

		/**
		 * Добавление даты оптравки сообщения
		 */
		fields.date = getDate();

		let messagesRef = firebase.database().ref('messages');
		/** Добавляем новое сообщение */
		messagesRef.push({
			...fields
		})

		// setMessages([...messages, fields]);

		/**
		 * Очищаем поля формы
		 */
		setFormData({
			...fields,
			...fieldsInit,
		});

		setMessageTextTouched(false);
	};

	/**
	 * Отправка сообщения при нажатии Enter если форма валидна
	 */
	const onKeyDown = (event) => {
		if ((event.code === "Enter" || event.code === "NumpadEnter") && isFormValid) {
			event.preventDefault();
			handleSubmit(event);
		}
	};

	return (
		<form className="write-message-form" onSubmit={handleSubmit}>
			{/* <input type="text" className="your-name" placeholder="Anonymous" /> */}

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
				onKeyPress={onKeyDown}
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
