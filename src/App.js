import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompleteProfile from './pages/CompleteProfile';
import ForgetPwd from './pages/ForgetPwd';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/homepage' element={<HomePage/>}></Route>
      <Route path='/profile' element={<CompleteProfile/>}></Route>
      <Route path='/reset' element={<ForgetPwd/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
