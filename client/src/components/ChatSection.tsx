import { useState } from 'react';
import { User } from '../App';
import ChatBubble from '../components/ChatBubble';
import { Chat, Message } from '../pages/ChatPage';
import { socket } from '../socket';

type Props = {
	myUser: User;
	currentChat: Chat;
	messages: Message[];
};

function ChatSection({ myUser, currentChat, messages }: Props) {
	const [newMessage, setNewMessage] = useState('');

	const sendMessage: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		socket.emit('send-message', {
			user: myUser,
			chat: currentChat._id,
			message: newMessage,
		});
		setNewMessage('');
	};

	return (
		<div className="flex-1 h-full flex flex-col overflow-hidden relative">
			<div className="navbar justify-between border-b border-base-content">
				<div>
					<a className="btn btn-ghost">
						{currentChat.name
							.split(',')
							.filter((username) => username !== myUser.username)
							.join('')}
					</a>
				</div>

				<div>
					<button className="btn btn-ghost">...</button>
				</div>
			</div>

			<div className="flex-1 p-4 overflow-auto relative flex flex-col-reverse">
				{messages.map((message) => {
					const timestamp = new Date(message.createdAt);
					if (message.user.username === myUser.username) {
						return (
							<ChatBubble
								key={message._id}
								username={message.user.username}
								message={message.message}
								timestamp={`${
									timestamp.getMonth() + 1
								}/${timestamp.getDate()}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp
									.getMinutes()
									.toString()
									.padStart(2, '0')}`}
								orientation="chat-end"
							/>
						);
					} else {
						return (
							<ChatBubble
								key={message._id}
								username={message.user.username}
								message={message.message}
								timestamp={`${
									timestamp.getMonth() + 1
								}/${timestamp.getDate()}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp
									.getMinutes()
									.toString()
									.padStart(2, '0')}`}
								orientation="chat-start"
							/>
						);
					}
				})}
			</div>

			<form className="flex gap-4 p-4 border-t border-base-content" onSubmit={sendMessage}>
				<button className="btn">+</button>
				<input
					className="input input-bordered flex-1"
					type="text"
					id="message"
					name="message"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
				/>
				<button className="btn">Send</button>
			</form>
		</div>
	);
}

export default ChatSection;
