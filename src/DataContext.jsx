import React, { useState, useContext, createContext, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";

/** 
 * Контекст приложения
 * @component
 * @property {Object} messagesInit - Исходное состояние для массива сообщений
 * @property {Array} messages - Массив сообщений
 * @property {Function} setMessages - Функция изменения состояния messages
 * @property {Object} fieldsInit - Исходные данные полей формы
 * @property {Object} fields - Поля формы
 * @property {Function} setFormData - Функция изменения состояния fields
*/

const DataContext = createContext();

/** Initialize Firebase */
firebase.initializeApp({
	apiKey: "AIzaSyCtqtrFD2dPydMhzOsPYA7kGVh4c4pHlVM",
	authDomain: "react-chat-3fddd.firebaseapp.com",
	databaseURL:
		"https://react-chat-3fddd-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "react-chat-3fddd",
	storageBucket: "react-chat-3fddd.appspot.com",
	messagingSenderId: "724657066180",
	appId: "1:724657066180:web:ed7f2f996044d2be4ab991",
});

export const DataProvider = ({ children }) => {
	/** Создание БД */
	const firestore = firebase.database();
	
	/** 
	 * Исходное состояние массива сообщений
	 */
	const messagesInit = [
		{
			id: 1,
			author: "Anonymous",
			text:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est asperiores possimus nobis explicabo ipsum aliquid, blanditiis obcaecati commodi hic, distinctio mollitia iure. Voluptate illum odio repellendus aperiam quis voluptatem.",
			date: '2021-10-01 18:30:16'
		},
		{
			id: 2,
			author: "Anonymous",
			text:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est asperiores possimus nobis explicabo ipsum aliquid, blanditiis obcaecati commodi hic, distinctio mollitia iure. Voluptate illum odio repellendus aperiam quis voluptatem.",
			date: '2021-10-01 19:25:44'
		},
		{
			id: 3,
			author: "Anonymous",
			text:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est asperiores possimus nobis explicabo ipsum aliquid, blanditiis obcaecati commodi hic, distinctio mollitia iure. Voluptate illum odio repellendus aperiam quis voluptatem.",
			date: '2021-10-01 20:48:15'
		},
	];

	/** 
	 * Объявление переменной состояния сообщений
	*/
	const [messages, setMessages] = useState([]);

	/**
	 * При первом рендере обращаемся к БД и добавляем в state messages
	 */
	useEffect(() => {
		let messagesRef = firebase.database().ref('messages');
		messagesRef.on('value', (snapshot) => {
			const messages = snapshot.val();
			const messagesList = []

			for (let id in messages) {
				messagesList.push(messages[id]);
			}

			setMessages(messagesList);
		})
	}, []);

	/** 
	 * Исходное состояние полей формы
	*/
	const fieldsInit = {
		id: 1,
		author: "Anonymous",
		text: "",
		//info: "",
		date: null
	};

	/** 
	 * Объявление переменной состояния полей формы
	 */
	const [fields, setFormData] = useState(fieldsInit);

	return (
		<DataContext.Provider
			value={{
				messagesInit,
				messages,
				setMessages,
				fieldsInit,
				fields,
				setFormData,
				firebase,
				firestore,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
