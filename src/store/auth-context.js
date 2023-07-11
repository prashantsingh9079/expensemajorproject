import React from "react";


const AuthContext = React.createContext(
    {
        token:'',
        isLogin:()=>{},
        setLogin:()=>{}
    }
    )

export default AuthContext    