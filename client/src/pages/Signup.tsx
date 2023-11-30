import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			if (!response.ok) {
				throw new Error(`This is an HTTP error: The status is ${response.status}`);
			}
			let data = await response.json();
			console.log(data);
		} catch (err) {
			console.log(err);
		}
  }
  return (
    <>
      <h1>Signup</h1>
      <form className="flex flex-col max-w-sm" onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input className="border border-black" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <label htmlFor="password">Password</label>
        <input className="border border-black" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <p>Already have an account? <Link to={'/'}>Login</Link></p>
    </>
  )
}

export default Signup;