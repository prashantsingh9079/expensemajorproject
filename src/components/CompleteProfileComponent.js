import React, { useContext,useRef } from 'react'
import { Nav, Card,Button } from 'react-bootstrap'
import AuthContext from '../store/auth-context';

export default function CompleteProfileComponent() {

    const authCtx = useContext(AuthContext)
    const nameRef = useRef();
    const photoUrlRef = useRef();

    async function detailHandler(e)
    {
        e.preventDefault();
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBVdiTtU09rW2Qlqai3VD0M5lKcBOqftNQ",
        {
            method:'POST',
            body:JSON.stringify(
                {
                    idToken:authCtx.token,
                    displayName:nameRef.current.value,
                    photoUrl:photoUrlRef.current.value,
                    returnSecureToken:true
                }
            )
        }
        )

        const res1 = await res.json();
        console.log(res1)
    }


  return (
    <>
      <Nav style={{color:'white',background:'grey',justifyContent:'space-between'}}>
        <h3><i>Winners never quit, quitters never wins</i></h3>
        <h3><i>Your profile is 64% complete, please fill all</i></h3>
      </Nav>
      <h3 style={{textAlign:'center'}}>Contact Details</h3>
      <br />
      <Card style={{marginLeft:'15rem',marginRight:'45rem',padding:'5rem',borderRadius:'3rem',background:'lightgrey',marginBottom:'12rem'}}>
      <form >
        
        <input type="text" placeholder='Full Name' ref={nameRef} />
        <br /><br />
        <input type="text" placeholder='Profile Photo URL' ref={photoUrlRef} />
        <br /><br />
        <Button onClick={detailHandler}>Save</Button>

      </form>
      </Card>
    </>
  )
}
