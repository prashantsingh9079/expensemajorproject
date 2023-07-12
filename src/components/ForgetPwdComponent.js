import React, { useRef } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function ForgetPwdComponent() {

    const navigate = useNavigate()

    const inputRef = useRef();



    async function sendReset(e) {
        e.preventDefault();
        if (inputRef.current.value === '') {
            alert("please enter a valid email");
            navigate('/reset')
            return
        }
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBVdiTtU09rW2Qlqai3VD0M5lKcBOqftNQ",
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        requestType: 'PASSWORD_RESET',
                        email: inputRef.current.value
                    }
                ),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const res1 = await res.json();
        console.log(res1)
        alert("email reset link send , kindly check your email")
        navigate('/')

    }
    return (
        <>
            <br /><br />
            <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
            <Card style={{ margin: '6rem', padding: '7rem', background: 'lightgrey', borderRadius: '2rem' }}>

                <input placeholder='Enter Email ID' ref={inputRef} />
                <br /><br />
                <Button onClick={sendReset}>Send Verification Mail</Button>
            </Card>
        </>
    )
}
