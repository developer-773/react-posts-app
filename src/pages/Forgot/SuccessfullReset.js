import React from 'react'
import { Link } from 'react-router-dom'
import "./Forgot.css"

export default function SuccessfullReset({successfully}) {
  return (
    <div style={{marginTop: "13rem"}} className={`text-center w-25 mx-auto`}>
        <h2>Password reset</h2>
        <p className='text-secondary mt-5'>Your password has been successfully reset. Click below to continue.</p>
        <Link className='btn btn-primary d-block' to="/">Continue</Link>
    </div>
  )
}
