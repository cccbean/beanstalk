import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';
import ChatPage from './pages/ChatPage';

export type User = {
	_id: string;
	username: string;
	isOnline: boolean;
	friends: string[];
};

function App() {
	const [user, setUser] = useState<User>({ _id: '', username: '', isOnline: false, friends: [] });

	return (
		<>
			<BrowserRouter>
				<Routes>
					{user._id === '' ? (
						<Route path="/" element={<Login setUser={setUser} />} />
					) : (
						<Route path="/" element={<ChatPage myUser={user} />} />
					)}
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
