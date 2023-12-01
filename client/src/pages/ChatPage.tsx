import { io } from 'socket.io-client';
import { User } from '../App';
import ChatSection from '../components/ChatSection';
import Menu from '../components/Menu';
import SidebarChat from '../components/SidebarChat';
import { useEffect, useState } from 'react';

export type Chat = {
	_id: string;
	name: string;
	users: User[];
};

export type Message = {
	_id: string;
	user: User;
	message: string;
	createdAt: string;
};

type Props = {
	myUser: User;
};

function ChatPage({ myUser }: Props) {
	const [chats, setChats] = useState<Chat[]>([]);
	const [currentChat, setCurrentChat] = useState<Chat>({ _id: '', name: '', users: [] });
	const [messages, setMessages] = useState<Message[]>([]);
	const socket = io('http://localhost:3000');

	useEffect(() => {
		function onGetChatsEvent(data: Chat[]) {
			setChats(data);
			console.log(data);
		}

		function onGetMessagesEvent(data: Message[]) {
			setMessages(data);
			console.log(data);
		}

		function onSendMessageEvent(data: Message) {
      console.log(data);
			setMessages((previous) => [...previous, data]);
		}

		socket.emit('get-chats', myUser);
		socket.on('get-chats', onGetChatsEvent);
		socket.on('get-messages', onGetMessagesEvent);
		socket.on('send-message', onSendMessageEvent);

		return () => {
			socket.off('get-chats', onGetChatsEvent);
			socket.off('get-messages', onGetMessagesEvent);
			socket.off('send-message', onSendMessageEvent);
		};
	}, []);

	return (
		<div className="h-screen flex">
			<Menu myUser={myUser} />
			<SidebarChat myUser={myUser} socket={socket} chats={chats} setCurrentChat={setCurrentChat} />
			{currentChat._id !== '' && (
				<ChatSection
					myUser={myUser}
					socket={socket}
					currentChat={currentChat}
					messages={messages}
				/>
			)}
		</div>
	);
}

export default ChatPage;
