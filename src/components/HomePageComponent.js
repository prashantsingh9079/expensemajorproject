import React from 'react'
import {Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function HomePageComponent() {
  return (
    <>
    <Nav style={{color:'white',background:'grey',display:'flex',justifyContent:'space-between'}}>
        <h3><i>Welcome to Expense Tracker!!!</i></h3>
        <h3><i>Your Profile is incomplete.</i><Link to='/profile'><i>Complete Now</i></Link></h3>
    </Nav>
      
    </>
  )
}
