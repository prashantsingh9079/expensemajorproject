import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/homepage' element={<HomePage/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
