import React,{useState} from 'react'
import AuthContext from './auth-context'

export default function AuthProvider(props) {

    const [token,setToken] = useState(null);

    function checkIsLogin()
    {
        return !!token
    }

    function setLogin(token)
    {
        setToken(token)
    }

    function logout()
    {
      setToken(null)
    }

    const val = {
        token:token,
        isLogin:checkIsLogin,
        setLogin:setLogin,
        logout:logout
    }


  return (
    <AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
  )
}
