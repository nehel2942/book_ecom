import React from 'react'
import Layout from '../../components/Layout/Layout'
import  { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                {email,newPassword,answer});
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.")
        }
    }
  return (
    <Layout title= " Forgot Password - Ecommercebookstore APP">
        <div className="forgot">
    
    <h1>Reset Password</h1>

  <form onSubmit={handleSubmit}>
  

  <div className="mb-3">
    <input
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder="Email"
      value={email}
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      onChange={(e) => setAnswer(e.target.value)}
      className="form-control"
      id="exampleInputanswer"
      placeholder="Enter your favourite sport"
      value={answer}
      required
    />
  </div>

  

  <div className="mb-3">
    <input
      type="password"
      onChange={(e) => setNewPassword(e.target.value)}
      className="form-control"
      id="exampleInputPassword2"
      placeholder="Input new Password"
      value={newPassword}
      required
    />
  </div>

  
  

  
  <button type="submit" className="btn btn-primary">
    Reset
  </button>
</form>

        </div>
    </Layout>
  )
}

export default ForgotPassword