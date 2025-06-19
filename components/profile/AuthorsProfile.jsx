import React,{ useState, useEffect } from "react";
import Header from "../header/Header";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import './style.css'
import Footer from "../footer/Footer";
const GetBookAuthorByLogin =  React.lazy(()=> import ("./GetBookAuthorByLogin"));
import LoadingScreen from "../catalog/LoadingScreen";
import BlockHeaderMobile from "../mobile/BlockHeaderMobile";
import FooterMobile from "../mobile/FooterMobile";
function parseDate(dateString) {
    const [day, month, year] = dateString.split('.');
    return new Date(`${year}-${month}-${day}`);
  }
  
  function calculateAge(birthDate) {
    const birth = parseDate(birthDate); // Используем, если дата в формате "DD.MM.YYYY"
    const today = new Date();
  
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
  
    return age;
  }
  function getAgeWord(age) {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return "лет";
    }
  
    switch (lastDigit) {
      case 1:
        return "год";
      case 2:
      case 3:
      case 4:
        return "года";
      default:
        return "лет";
    }
  }
const AuthorsProfile = () => {
    const {login} = useParams();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const handleLogout =()=>{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const response = await fetch(`http://localhost:5000/api/authors/${login}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok){
                    const errorData = await response.json();
                    toast.error(errorData);
                }
                const data = await response.json();
                setUser(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    },[login]);
    useEffect(() => {
        const loadResources = async () => {
           
            setTimeout(() => {
                setLoading(false);
            }, 400); 
        };

        loadResources();
    }, []);
   
    return (
        <>
        {loading ? <LoadingScreen /> : (
        <>
        
            <Header/>
            <BlockHeaderMobile/>
            <img src="/image/elipse_back_block_four.png" alt="" className="ellipse_back_profile"/>
            <div className="block_one_profile">
                
                <h1 className="title_profile">Профиль</h1>
                {user.map((user)=>(
                    <div className="div_profile" key={user._id}>
                        <div className="div_profile_control">

                        
                        <div className="avatar_div">

                       
                        <div className="avatar-container">
            <img 
             src={user?.avatar ? `http://localhost:5000/${user.avatar}` : '/image/avatar.jpg'} 
            alt="" 
            className="avatar_profile" 
            />
            
            </div> 
            </div>
                    <div className="div_li_profile">
                        <p className="p_profile">Имя: {user.name}</p>
                        <p className="p_profile">Возраст: {(() => {
    const age = calculateAge(user.age);
    return `${age} ${getAgeWord(age)}`;
  })()} </p>
                         <div className="div_li_profile"> <p className="p_profile">Псевдоним: {user.pseudonym}</p>
                            <p className="p_profile">Написанных книг: {user.book_much} </p> </div>
                    </div>
                    
                        </div>
                         <div className="bio">
                        <p className="p_profile">Об авторе:</p>
                        <p className="p_profile">{user.bio}</p></div>
                    </div>
                ))}
                
            </div>
            
              <GetBookAuthorByLogin/>
                <Footer/>
                <FooterMobile/>
        </>
        )}
        </>
    );
}

export default AuthorsProfile;

