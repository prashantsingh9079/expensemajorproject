import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompleteProfile from './pages/CompleteProfile';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/homepage' element={<HomePage/>}></Route>
      <Route path='/profile' element={<CompleteProfile/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
