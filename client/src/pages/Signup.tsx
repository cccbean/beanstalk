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
    <div className="max-w-md mx-auto p-8 flex flex-col gap-4">
      <h1 className="text-2xl">Signup</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input className="input input-bordered" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input className="input input-bordered" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div>
          <button className="btn btn-outline" type="submit">Submit</button>
        </div>
      </form>
      <p>Already have an account? <Link className="link link-info" to={'/'}>Login</Link></p>
    </div>
  )
}

export default Signup;