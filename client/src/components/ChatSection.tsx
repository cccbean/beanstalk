import { User } from '../App';
import ChatBubble from '../components/ChatBubble';
import { Chat, Message } from '../pages/ChatPage';

type Props = {
  myUser: User;
  currentChat: Chat;
  messages: Message[];
}

function ChatSection({myUser, currentChat, messages}: Props) {
	return (
		<div className="flex-1 h-full flex flex-col">
			<div className="navbar justify-between border-b border-base-content">
				<div>
					<a className="btn btn-ghost">
						{currentChat.name}
					</a>
				</div>

				<div>
					<button className="btn btn-ghost">...</button>
				</div>
			</div>

			<div className="flex-1 p-4">
        {messages.map((message) => {
          if (message.user.username === myUser.username) {
            return <ChatBubble key={message._id} username={message.user.username} message={message.message} timestamp={message.createdAt} orientation="chat-end"  />
          } else {
            return <ChatBubble key={message._id} username={message.user.username} message={message.message} timestamp={message.createdAt} orientation="chat-start"  />
          }
        })}
			</div>

			<form className="flex gap-4 p-4 border-t border-base-content">
				<button className="btn">+</button>
				<input className="input input-bordered flex-1" type="text" id="message" name="message" />
				<button className="btn">Send</button>
			</form>
		</div>
	);
}

export default ChatSection;
