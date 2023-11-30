import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Chat() {
	const [messages, setMessages] = useState<string[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const socket = io('http://localhost:3000');

	useEffect(() => {
		function onMessagesEvent(data: string[]) {
			setMessages(data);
		}

		function onNewMessageEvent(data: string) {
			setMessages((previous) => [...previous, data]);
		}

		socket.on('messages', onMessagesEvent);
		socket.on('new-message', onNewMessageEvent);

		return () => {
			socket.off('messages', onMessagesEvent);
			socket.off('new-message', onNewMessageEvent);
		};
	}, []);

	const sendMessage: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		socket.emit('new-message', newMessage);
		setNewMessage('');
	};

	return (
		<>
			<h1 className="text-lg">Chat</h1>
			<ul>
				{messages.map((message) => (
					<li key={message}>{message}</li>
				))}
			</ul>
			<form onSubmit={sendMessage}>
				<input
					className="border border-black"
					type="text"
					id="message"
					name="message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
			<button onClick={() => console.log(messages)}>Help</button>
		</>
	);
}

export default Chat;
