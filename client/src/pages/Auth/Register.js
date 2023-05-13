import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css"

const Register = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                {name,email,phone,address,pass1,pass2,answer});
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
</form>

        </div>
        </Layout>
    )
}

export default Register;