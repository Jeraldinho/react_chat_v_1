import React, { useState, useContext, createContext } from "react";

// Создаем контекст, через который прокидываются данные во все компоненты
const DataContext = createContext();

export const DataProvider = ({ children }) => {
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
	const [messages, setMessages] = useState([]);

	// Поля формы по-умолчанию
	const fieldsInit = {
		id: 1,
		author: "Anonymous",
		text: "",
	};

	// Объявление переменной состояния полей формы
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
			}}
		>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
