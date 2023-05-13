import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall,  } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query about this app, please contact us.
          </p>
          <p className="mt-3">
            <BiMailSend /> : NIIT University mail
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : xxxxxxxxxx
          </p>
         
        </div>
      </div>
    </Layout>
  );
};

export default Contact;