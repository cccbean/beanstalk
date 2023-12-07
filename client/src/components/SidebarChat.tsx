import { useState } from 'react';
import { User } from '../App';
import tempAvatar from '../assets/Luffy-pic.png';
import { Chat } from '../pages/ChatPage';
import { socket } from '../socket';
import Search from './Search';
import NewChatBtn from './NewChatBtn';

type Props = {
	myUser: User;
	chats: Chat[];
	currentChat: Chat;
	setCurrentChat: React.Dispatch<React.SetStateAction<Chat>>;
};

function SidebarChat({ myUser, chats, currentChat, setCurrentChat }: Props) {
	const [searchResults, setSearchResults] = useState<User[]>([]);

	return (
		<div className="h-full border-r border-base-content flex flex-col w-80 gap-2">
			<div className="flex items-center justify-between px-4 pt-4 pb-2">
				<h1 className="text-2xl">Chat</h1>
				<NewChatBtn myUser={myUser} />
			</div>

			<div className="flex justify-center px-2 pb-2">
				<Search myUser={myUser} setSearchResults={setSearchResults} />
			</div>

			<ul className="menu menu-vertical p-0">
				{/* TODO: extract this out to its own component to handle click logic that opens the chat */}
				{/* TODO: handle the case where searchResults returns an empty array */}
				{searchResults.length > 0
					? searchResults.map((user) => {
							return (
								<li key={user._id}>
									<a className="flex gap-4 rounded-none">
										<div className="avatar">
											<div className="w-12 rounded-full">
												<img src={tempAvatar} alt="" />
											</div>
										</div>

										<p>{user.username}</p>
									</a>
								</li>
							);
					  })
					: chats.map((chat) => {
							const [otherUser] = chat.users.filter((user) => user.username !== myUser.username);

							return (
								<li
									className={currentChat._id === chat._id ? 'bg-base-300' : ''}
									key={chat._id}
									onClick={() => {
										socket.emit('get-messages', chat._id);
										setCurrentChat(chat);
									}}
								>
									<a className="flex gap-4 rounded-none">
										<div className="avatar">
											<div className="w-12 rounded-full">
												<img src={tempAvatar} alt="" />
											</div>
										</div>

										<p>{otherUser.username}</p>
									</a>
								</li>
							);
					  })}
			</ul>
		</div>
	);
}

export default SidebarChat;
