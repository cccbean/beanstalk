import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useState } from "react"

export type User = {
  id: string;
  username: string;
  password: string;
}

function App() {
  const [user, setUser] = useState<User>({id: '', username: '', password: ''})

  return (
    <>
      <BrowserRouter>
        <Routes>
          {user.id === '' ? <Route path='/' element={<Login setUser={setUser} />} /> : <Route path='/' element={<h1>Test</h1>} />}
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
