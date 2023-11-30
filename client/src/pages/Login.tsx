import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../App";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function Login({setUser}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			if (!response.ok) {
				throw new Error(`This is an HTTP error: The status is ${response.status}`);
			}
			let data = await response.json();
			console.log(data);
      setUser(data);
		} catch (err) {
			console.log(err);
		}
  }
  return (
    <>
      <h1>Login</h1>
      <form className="flex flex-col max-w-sm" onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input className="border border-black" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <label htmlFor="password">Password</label>
        <input className="border border-black" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>Not registered? <Link to={'/signup'}>Sign up</Link></p>
    </>
  )
}

export default Login;