import React from "react";


const AuthContext = React.createContext(
    {
        token:'',
        isLogin:()=>{},
        setLogin:()=>{},
        logout:()=>{}
    }
    )

export default AuthContext    