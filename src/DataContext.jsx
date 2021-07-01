import React, { useState, useContext, createContext, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";

/** Создание контекста */
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

	/** Исходное состояние массива сообщений */
	const messagesInit = [
		{
			id: 1,
			author: "Anonymous",
			text:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est asperiores possimus nobis explicabo ipsum aliquid, blanditiis obcaecati commodi hic, distinctio mollitia iure. Voluptate illum odio repellendus aperiam quis voluptatem.",
		},
	];

	/**  Объявление переменной состояния сообщений */
	const [messages, setMessages] = useState([]);

	/** Исходное состояние полей формы */
	const fieldsInit = {
		id: 1,
		author: "Anonymous",
		text: "",
	};

	/** Объявление переменной состояния полей формы */
	const [fields, setFormData] = useState(fieldsInit);

	return (
		<DataContext.Provider
			value={{
				messagesInit,
				messages,
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
