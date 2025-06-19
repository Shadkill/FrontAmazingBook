
import Header from "../header/Header";
import { Link } from "react-router-dom";
import InformationProfile from "./InformationProfile";
import './style.css'
import Footer from "../footer/Footer";
import BlockLokeedProfile from "./BlockLokeedProfile";
import { useEffect, useState } from "react";
import LoadingScreen from "../catalog/LoadingScreen";
import BlockHeaderMobile from "../mobile/BlockHeaderMobile";
import FooterMobile from "../mobile/FooterMobile";
const Profile = () => {
   const [loading,setLoading] =useState(true);
    const token = localStorage.getItem("token");

    const handleLogout =()=>{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
   useEffect(() => {
           const loadResources = async () => {
              
               setTimeout(() => {
                   setLoading(false);
               }, 400); 
           };
   
           loadResources();
       }, []);
    return (
        loading? <LoadingScreen/> :
        <> <div className="parent">
            <Header/>
            <BlockHeaderMobile/>
           
            
            <img src="/image/elipse_back_block_four.png" alt="" className="ellipse_back_profile"/>
          <div className="block_info_profile">

          
            <InformationProfile/>
            </div>
              <BlockLokeedProfile/>
                <Footer/>
                <FooterMobile/>
                </div>
        </>
    );
}

export default Profile;
