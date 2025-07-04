import react from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
