import React from "react";
import { Link } from "react-router-dom";
import { contact_, facebook, Loc_, mail_, tik_tok, x } from "../icons/icon";

const Footer = () => {
  return (
    <div className="bg_image_footer lg:min-h-[30rem] flex justify-center items-center relative">
    <div className="container ">
      <div className="row justify-center md:mt-0 mt-12 pb-5  lg:ps-36" style={{borderBottom:"1px solid white"}}>
      <div className="col-lg-4 col-sm-4 md:mb-0 mb-4 md:text-start text-center col-12">
        <div className="flex md:items-start items-center flex-col gap-3">
          <h4 className="gilroy-medium text-md text-white ">Links</h4>
          <Link to='/'  className="  no-underline text-white hover:no-underline">About us</Link>
          <Link to='/'  className="  no-underline text-white hover:no-underline">FaQs</Link>
          <Link to='/'  className="  no-underline text-white hover:no-underline">Contact us</Link>
        </div>
      </div>
      <div className="col-lg-4 col-sm-4  md:mb-0 mb-4 md:text-start text-center col-12">


        <div className="flex flex-col md:items-start items-center gap-3">
          <h4 className="gilroy-medium text-md text-white ">Get in Touch</h4>
          <Link to='/'  className="  no-underline text-white hover:no-underline">
          <div className="flex items-center gap-3">
          <div>
          <img src={contact_} style={{width:"1rem"}} alt=""/>
          </div>
          <p className="text-sm m-0">+471012 3456 789</p>
          </div>
          </Link>
          <Link to='/'  className="  no-underline text-white hover:no-underline">
          <div className="flex md:items-start items-center gap-3">
          <div>
          <img src={mail_} style={{width:"1rem"}} alt=""/>
          </div>
          <p className="text-sm m-0">info@zikrapp.com</p>
          </div>
          </Link>
          <Link to='/'  className="  no-underline text-white hover:no-underline">
          <div className="flex md:items-start items-center gap-3">
          <div>
          <img src={Loc_} style={{width:"1rem"}} alt=""/>
          </div>
          <p className="text-sm m-0 md:w-[13rem] w-auto">15 Dartmouth Street Storgata, 
          Oslo 1061 UK</p>
          </div>
          </Link>
        </div>
      </div>
      <div className="col-lg-4 col-sm-4  md:mb-0 mb-4 md:text-start text-center col-12">
        <div className="flex flex-col md:items-start items-center  gap-3">
          <h4 className="gilroy-medium md:text-start text-center text-md text-white ">Follow Us</h4>
          <div className="flex md:justify-start md:items-start items-center  gap-1">

          <Link to='/'  className="  no-underline text-white hover:no-underline">
          <img src={facebook} style={{width:"2.3rem"}} alt=""/>

          </Link>
          <Link to='/'  className="  no-underline text-white hover:no-underline">
          <img src={x} style={{width:"2.3rem"}} alt=""/>

          </Link>
          <Link to='/'  className="  no-underline text-white hover:no-underline">
          <img src={tik_tok} style={{width:"2.3rem"}} alt=""/>

          </Link>
          </div>
        </div>
      </div>
      </div>
      <div className="text-center text-white pt-5 md:pb-0 pb-5">
        Copyright Zikr App, LLC2024
      </div>
    </div>

    </div>
  );
};

export default Footer;
