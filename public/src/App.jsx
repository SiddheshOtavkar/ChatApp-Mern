import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from "./pages/SetAvatar";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </Router>
  )
}

export default App

// https://github.com/koolkishan/chat-app-react-nodejs/blob/master/public/src/assets/robot.gif