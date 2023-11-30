import { User } from '../App';
import ChatSection from '../components/ChatSection';
import Menu from '../components/Menu';
import SidebarChat from '../components/SidebarChat';

type Props = {
  myUser: User;
}

function ChatPage({myUser}: Props) {
  

	return (
		<div className="h-screen flex">
			<Menu myUser={myUser} />
			<SidebarChat myUser={myUser} />
      <ChatSection myUser={myUser} />
		</div>
	);
}

export default ChatPage;
