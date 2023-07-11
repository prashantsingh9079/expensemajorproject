import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HomePageComponent() {

  async function verifyHandler(e) {
    e.preventDefault();
    try
    {
    const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBVdiTtU09rW2Qlqai3VD0M5lKcBOqftNQ",
      {
        method: 'POST',
        body: JSON.stringify(
          {
            requestType: 'VERIFY_EMAIL',
            idToken: localStorage.getItem("token")
          }
        ),
        headers:{'Content-Type': 'application/json'}
      }
    )

    const res1 = await res.json()
    console.log(res1)
    alert("kindly check you mail, verification mail is send")
    }
    catch(e)
    {
      console.log(e.message)
    }

  }

  return (
    <>
      <Nav style={{ color: 'white', background: 'grey', display: 'flex', justifyContent: 'space-between' }}>
        <h3><i>Welcome to Expense Tracker!!!</i></h3>
        <h3><i>Your Profile is incomplete.</i><Link to='/profile'><i>Complete Now</i></Link></h3>
      </Nav>
      <br />
      <h5 style={{ marginLeft: '4rem' }}>Please Verify your Email ID</h5>
      <br />
      <Button onClick={verifyHandler} style={{ marginLeft: '4rem' }}>Verify email</Button>
    </>
  )
}
