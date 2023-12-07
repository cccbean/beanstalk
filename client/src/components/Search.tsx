import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { User } from '../App';

type Props = {
	myUser: User;
	setSearchResults: React.Dispatch<React.SetStateAction<User[]>>;
};

function Search({ myUser, setSearchResults }: Props) {
	const [search, setSearch] = useState('');

	useEffect(() => {
		function onSearchEvent(data: User[]) {
			console.log(data);
			setSearchResults(data);
		}

		const postSearch = setTimeout(() => {
			socket.emit('search', { myUser, search });
		}, 500);
		if (search === '') {
			clearTimeout(postSearch);
      setSearchResults([]);
		}
		socket.on('search', onSearchEvent);

		return () => {
			clearTimeout(postSearch);
			socket.off('search', onSearchEvent);
		};
	}, [search]);

	return (
		<input
			className="input input-bordered flex-1 rounded-full"
			type="search"
			id="search"
			name="search"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
		/>
	);
}

export default Search;
