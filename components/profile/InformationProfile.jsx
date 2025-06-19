
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
const InformationProfile = () => {
    const [user, setUser] = useState([]);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const response = await fetch('http://localhost:5000/api/userInfo',{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
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
    },[token])
    return (
        <>
        <div className="block_one_profile">
                
        <h1 className="title_profile">Профиль</h1>
        {user.map((user)=>(
            <div className="div_profile" key={user._id}>
                <div className="div_profile_control">

                
                <div className="avatar_div">

               
                <div className="avatar-container5">
    <img 
     src={user?.avatar ? `http://localhost:5000/${user.avatar}` : './image/avatar.jpg'} 
    alt="" 
    className="avatar_profile" 
    />
    
  
   
    
    </div> 
    {(role === 'author'? <Link to={'/bookCreate'}><button className='button_profile' >Добавить книгу</button></Link> : <Link to={'/authorCreate'}><button className='button_profile' >Я хочу стать автором</button></Link>)}
    
    </div>
            <div className="div_li_profile">
              
            <div className="div_icon_update_profile">
              <p className="p_profile">Имя: {user.name} </p>
                <Link to={'/updateProfile'}><img src="/public/image/icon_update.png" alt="" className="icon_update_profile"/></Link>
              </div>
                
                <p className="p_profile">Возраст: {(() => {
    const age = calculateAge(user.age);
    return `${age} ${getAgeWord(age)}`;
  })()} </p>
                {(role === 'author' ? <div className="div_li_profile"> <p className="p_profile">Псевдоним: {user.pseudonym}</p>
                    <p className="p_profile">Написанных книг: {user.book_much} </p> </div>:<div></div> )}
                    
            </div>
            
                </div>
                {(role === 'author' ? <div className="bio">
                <p className="p_profile">Обо мне:</p>
                <p className="p_profile">{user.bio}</p></div>:<div></div>)}
            </div>
        ))}
        
    </div>
    </>
    );
}

export default InformationProfile;
