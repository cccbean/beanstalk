import ChatBubble from '../components/ChatBubble';
import Menu from '../components/Menu';
import SidebarChat from '../components/SidebarChat';

function ChatPage() {
	return (
		<div className="h-screen flex">
			<Menu />

			<SidebarChat />

			<div className='flex-1 h-full flex flex-col'>
        <div className="navbar justify-between border-b border-base-content">
          <div>
            <a className='btn btn-ghost' href="">Monkey D. Luffy</a>
          </div>

          <div>
            <button className='btn btn-ghost'>...</button>
          </div>
        </div>

        <div className='flex-1 p-4'>
          <ChatBubble username='Monkey D. Luffy' message="I'm gonna be King of the Pirates!" timestamp='14:09' orientation='chat-start' />

          <ChatBubble username='Monkey D. Luffy' message="No, me!" timestamp='14:10' orientation='chat-end' />
        </div>

        <form className='flex gap-4 p-4 border-t border-base-content'>
          <button className="btn">+</button>
          <input className='input input-bordered flex-1' type="text" id="message" name='message' />
          <button className="btn">Send</button>
        </form>
      </div>
		</div>
	);
}

export default ChatPage;
