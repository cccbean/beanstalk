import { useRef, useState } from 'react';
import { User } from '../App';
import { socket } from '../socket';

type Props = {
	myUser: User;
};

function NewChatBtn({ myUser }: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [users, setUsers] = useState('');
	const [chatName, setChatName] = useState('');

	return (
		<>
			<button className="btn btn-sm" onClick={() => dialogRef.current?.showModal()}>
				N
			</button>
			<dialog className="modal" ref={dialogRef}>
				<div className="modal-box">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-bold">New Chat</h1>
						<button className="btn btn-sm" onClick={() => dialogRef.current?.close()}>
							X
						</button>
					</div>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							socket.emit('new-chat', { users, chatName });
							setUsers('');
							setChatName('');
              // dialogRef.current?.close();
              // TODO: uncomment ^
						}}
					>
						<div className="flex flex-col">
							<label htmlFor="users">Users</label>
							<input
								className="input input-bordered"
								type="text"
								id="users"
								name="users"
								value={users}
								onChange={(e) => setUsers(e.target.value)}
							/>
						</div>

						<div className="flex flex-col">
							<label htmlFor="chatName">Chat name</label>
							<input
								className="input input-bordered"
								type="text"
								id="chatName"
								name="chatName"
								value={chatName}
								onChange={(e) => setChatName(e.target.value)}
							/>
						</div>

						<button className="btn btn-outline">Create</button>
					</form>
				</div>
			</dialog>
		</>
	);
}

export default NewChatBtn;
