import React, { useRef, useState, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';

export default function LoginComponent() {

  const authCtx = useContext(AuthContext)
  const [newUser, setNewUser] = useState(true)
  const emailRef = useRef();
  const pwdRef = useRef()
  const pwdAgainRef = useRef()
  const navigate = useNavigate()

  var token = ''

  async function submitHandler(e) {
    e.preventDefault();
    if (newUser) {
      if (pwdRef.current.value === '') {
        alert("Please Enter Valid Password")
        return
      }
      if (pwdAgainRef.current.value !== pwdRef.current.value) {
        alert("Password does not match reconfirm password")
        return;
      }

      const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVdiTtU09rW2Qlqai3VD0M5lKcBOqftNQ",
        {
          method: 'POST',
          body: JSON.stringify({
            email: emailRef.current.value,
            password: pwdRef.current.value,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const res1 = await res.json()
      // console.log(res1)
      token = res1.idToken
      authCtx.setLogin(token)
      localStorage.setItem("token",token)
      alert("Successfully created ")
      setNewUser(false)
      emailRef.current.value = '';
      pwdAgainRef.current.value = '';
      pwdRef.current.value = ''

    }
    else {
      const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVdiTtU09rW2Qlqai3VD0M5lKcBOqftNQ", {
        method: 'POST',
        body: JSON.stringify(
          {
            email: emailRef.current.value,
            password: pwdRef.current.value,
            returnSecureToken: true
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const res1 = await res.json();
      // console.log(res1)
      token = res1.idToken
      authCtx.setLogin(token)
      localStorage.setItem("token",token)
      if (token !== undefined) {
        alert('valid credintails , signed in')
        navigate('/homepage')
      }
      else
      {
        alert("invalid credintials!!!")
        emailRef.current.value='';
        pwdRef.current.value=''
      }

    }
    console.log(token)
  }

  function setTrue() {
    setNewUser(true)
  }

  function setFalse() {
    setNewUser(false)
  }



  return (
    <>
      <Card style={{ textAlign: 'center', marginTop: '8rem', marginLeft: '20rem', marginRight: '20rem', marginBottom: '20rem', padding: '3rem', borderRadius: '3rem', background: 'lightgray' }}>
        <h1>{newUser ? 'Sign Up' : 'Sign In'}</h1>
        <br />
        <form style={{ listStyle: 'none' }} >
          <li><input type="email" placeholder='Enter Email' ref={emailRef} required /></li>
          <br />
          <li><input type="password" placeholder='Enter Password' ref={pwdRef} required /></li>
          <br />
          {newUser && <li><input type="text" placeholder='Enter Password Again' ref={pwdAgainRef} required /></li>}
          <br />
          <Button onClick={submitHandler} style={{ paddingLeft: '3rem', paddingRight: '3rem' }}>{newUser ? 'Create account' : 'Sign In'}</Button>
        </form>
        <br />
        <br />
        {newUser && <i onClick={setFalse}>Already have a account click here</i>}
        {!newUser && <i onClick={setTrue}>Create a account</i>}
      </Card>
    </>
  )
}
