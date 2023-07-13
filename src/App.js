import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import CompleteProfile from './pages/CompleteProfile';
import ForgetPwd from './pages/ForgetPwd';
import Expense from './pages/Expense';
import {  useSelector } from 'react-redux/es/hooks/useSelector';


function App() {

  const token = useSelector(state => state.auth.token)
  const arrFromRedux = useSelector(state => state.expense.items)

  console.log(arrFromRedux)
  
  return (
    <BrowserRouter>
    <Routes>
      {!token && <Route path='/' element={<Login/>}></Route>}
      {token && <Route path='/homepage' element={<HomePage/>}></Route>}
      {token && <Route path='/profile' element={<CompleteProfile/>}></Route>}
      {token &&<Route path='/reset' element={<ForgetPwd/>}></Route>}
      { <Route path='/expense' element={<Expense/>}></Route>}
      <Route path='*' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
