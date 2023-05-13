import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import "../../styles/Dashboard.css";

const Dashboard = () => {
const [auth] = useAuth()

  return (
    <Layout title={"Dashboard - Ecommerbookstore App"}>
        <div className='container-fluid m-3 p3'>
        <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
          </div>
          <div className='col-md-3'>
            <div className='card w-200 p3 user-div'>
              <h1>Your Details</h1>
              <h3><strong>Name:</strong> {auth?.user?.name}</h3>
              <h3><strong>Email:</strong> {auth?.user?.email}</h3>
              <h3><strong>Address:</strong> {auth?.user?.address}</h3>


            </div>
          </div>
          </div>
        </div>
        </Layout>
  )
}

export default Dashboard