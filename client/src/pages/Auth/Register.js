import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { Select } from "antd";
import "../../styles/AuthStyles.css"
const { Option } = Select;


const Register = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [answer, setAnswer] = useState("")
    const [role, setRole] = useState(0)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                {name,email,phone,address,pass1,pass2,answer,role});
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong.")
        }
    }
    const handleGoogleLogin = async (n,e) => {
      try {
        console.log(n,e)
          const res = await axios.post(
              `${process.env.REACT_APP_API}/api/v1/auth/gsignup`,
              {n,e});
          if(res.data.success){
              toast.success(res.data.message)
              navigate("/login")
          }
      } catch (error) {
          console.log(error)
          toast.error("Something went wrong.")
      }
  }
    return(
        <Layout title="Register - Book Store">
  <div className="register">
    
    <h1>Register</h1>

    <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Role "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setRole(value);
                  }}
                >
                  <Option value="0">Buyer</Option>
                  <Option value="1">Seller</Option>
                </Select>
    </div>

  <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <input
      type="text"
      onChange={(e) => setName(e.target.value)}
      className="form-control"
      id="exampleInputName1"
      placeholder="Name"
      value={name}
      required
    />
  </div>

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
      onChange={(e) => setPhone(e.target.value)}
      className="form-control"
      id="exampleInputPhone1"
      placeholder="Phone"
      value={phone}
      required
    />
  </div>

  <div className="mb-3">
    <input
      type="text"
      onChange={(e) => setAddress(e.target.value)}
      className="form-control"
      id="exampleInputAddress1"
      placeholder="Address"
      value={address}
      required
    />
  </div>


  <div className="mb-3">
    <input
      type="password"
      onChange={(e) => setPass1(e.target.value)}
      className="form-control"
      id="exampleInputPassword1"
      placeholder="Password"
      value={pass1}
      required
    />
  </div>

  <div className="mb-3">
    <input
      type="password"
      onChange={(e) => setPass2(e.target.value)}
      className="form-control"
      id="exampleInputPassword2"
      placeholder="Confirm Password"
      value={pass2}
      required
    />
  </div>

  <div className="mb-3">
    <input
      type="text"
      onChange={(e) => setAnswer(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder="What is your favourite sport"
      value={answer}
      required
    />
  </div>

  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  <br />
      <h4>Sign Up with : </h4>
      <GoogleLogin
  onSuccess={credentialResponse => {
    var userObj = jwt_decode(credentialResponse.credential)
    console.log(userObj.name,userObj.email)
    handleGoogleLogin(userObj.name,userObj.email)
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

export default Register;