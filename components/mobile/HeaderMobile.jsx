
import { useState,useEffect, useRef } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const HeaderMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem("token");
    const dropdownRef = useRef(null);
    const handleLogout =()=>{
        localStorage.removeItem("token");
        toast.success("Вы вышли из аккаунта");
        window.location.href = "/";
    }

    
   

    const toggleDropDown = ()=>{
        setIsOpen(!isOpen);
    }
    const handleOptionClick = ()=>{
        setIsOpen(false);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Добавляем слушатель события
        document.addEventListener('mousedown', handleClickOutside);
        
        // Удаляем слушатель при размонтировании компонента
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="dropdawn1" ref={dropdownRef}>
                   
                                       
                                       <img src="/image/dropdawn_mobile.png" alt="" className="img_dropdawn2" onClick={toggleDropDown}/>
                                      {isOpen && (
                                       <ul className="dropdown_menu">
                                           <Link to={`/`} className="a_dropdown_item">
                                                   <li className="dropdown_item" onClick={()=>handleOptionClick}>
                                                  Главная
                                               </li>
                                               </Link>
                                          
                                               <Link to={`/catalog`}  className="a_dropdown_item">
                                                   <li  onClick={()=>handleOptionClick} className="dropdown_item">
                                                   Каталог
                                               </li>
                                               </Link>
                                               <Link to={`/authors`}  className="a_dropdown_item">
                                                   <li  onClick={()=>handleOptionClick} className="dropdown_item">
                                                   Авторы
                                               </li>
                                               </Link>
                                               <Link to={`/profile`}  className="a_dropdown_item">
                                                   <li  onClick={()=>handleOptionClick} className="dropdown_item">
                                                   Профиль
                                               </li>
                                               <li  onClick={()=>handleOptionClick} className="dropdown_item">
                                                   {(
                                                    token? <button className='button_auth' onClick={handleLogout}>Выйти</button>  : <Link to="/authorization"><button className='button_auth'>Войти</button></Link> 
                                                    )}
                                               </li>
                                               </Link>
                                       </ul>
                                      )}
               </div>
    );
}

export default HeaderMobile;
