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
}

type Props = {
  myUser: User;
}

function ChatPage({myUser}: Props) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const socket = io('http://localhost:3000');

  useEffect(() => {
    function onGetChatsEvent(data: Chat[]) {
      setChats(data);
    } 

		function onMessagesEvent(data: string[]) {
			setMessages(data);
		}

		function onNewMessageEvent(data: string) {
			setMessages((previous) => [...previous, data]);
		}

    socket.emit('get-chats', myUser);
    socket.on('get-chats', onGetChatsEvent);
		socket.on('messages', onMessagesEvent);
		socket.on('new-message', onNewMessageEvent);

		return () => {
      socket.off('get-chats', onGetChatsEvent);
			socket.off('messages', onMessagesEvent);
			socket.off('new-message', onNewMessageEvent);
		};
	}, []);

	return (
		<div className="h-screen flex">
			<Menu myUser={myUser} />
			<SidebarChat myUser={myUser} chats={chats} />
      <ChatSection myUser={myUser} />
		</div>
	);
}

export default ChatPage;
