import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios"
import jwt_decode from 'jwt-decode'
import { useNavigate , useLocation} from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

import { useAuth } from "../../context/auth"; 
import "../../styles/AuthStyles.css"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                {email,password});
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.")
        }
    }

    const handleGoogleLogin = async (e) => {
      try {
        console.log(e)
          const res = await axios.post(
              `${process.env.REACT_APP_API}/api/v1/auth/glogin`,
              {e});
              if(res && res.data.success){
                toast.success(res.data && res.data.message)
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.")
        }
  }
    return(
        <Layout title="Register - Book Store">
  <div className="register">
    
    <h1>Login</h1>

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
      type="password"
      onChange={(e) => setPassword(e.target.value)}
      className="form-control"
      id="exampleInputPassword1"
      placeholder="Password"
      value={password}
      required
    />
  </div>
  <div className="mb-3">
  <button type="button" className="btn btn-primary" onClick={() => {navigate('/forgot-password')}}>
    Forgot Password
  </button>
  </div>

  
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  <br />
      <h4>Log in with : </h4>
      <GoogleLogin
  onSuccess={credentialResponse => {
    var userObj = jwt_decode(credentialResponse.credential)
    console.log(userObj.email)
    handleGoogleLogin(userObj.email)
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
</form>

        </div>
        </Layout>
    )
}

export default Login;