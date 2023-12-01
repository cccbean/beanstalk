import { User } from '../App';
import tempAvatar from '../assets/Luffy-pic.png';
import { Chat } from '../pages/ChatPage';

type Props = {
	myUser: User;
	chats: Chat[];
};

function SidebarChat({ myUser, chats }: Props) {
	return (
		<div className="h-full border-r border-base-content flex flex-col w-80 gap-2">
			<div className="flex items-center justify-between px-4 pt-4 pb-2">
				<h1 className="text-2xl">Chat</h1>
				<button className="btn btn-sm">N</button>
			</div>

			<div className="flex justify-center px-2 pb-2">
				<input
					className="input input-bordered flex-1 rounded-full"
					type="search"
					id="search"
					name="search"
				/>
			</div>

			<ul className="menu menu-vertical p-0">
        {/* TODO: extract this out to its own component to handle click logic that opens the chat */}
				{chats.map((chat) => {
          const [otherUser] = chat.users.filter((user) => user.username !== myUser.username);

					return (
						<li key={chat._id}>
							<a className="flex gap-4 rounded-none" href="">
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
