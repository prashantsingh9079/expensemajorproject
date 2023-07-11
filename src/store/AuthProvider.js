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

    const val = {
        token:token,
        isLogin:checkIsLogin,
        setLogin:setLogin
    }


  return (
    <AuthContext.Provider value={val}>{props.children}</AuthContext.Provider>
  )
}
