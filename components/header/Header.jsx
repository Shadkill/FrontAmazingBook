
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { checkAdminRole } from '../../utils/authHelpers';
import toast from 'react-hot-toast';
const Header = () => {
    const [isAdmin,setIsAdmin] = useState(false);
    useEffect(()=>{
       const verifyAdmin = async()=>{
        const adminStatus = await checkAdminRole();
        setIsAdmin(adminStatus);
       }
       verifyAdmin();
    })
    const token = localStorage.getItem('token');
            const navigate = useNavigate();
        const handleLogout = () => {
            localStorage.removeItem('token');
            toast.success('Вы успешно вышли из аккаунта!')
            navigate('/');
        };
    return (
        <>
             <header className="header">
                <p className='title_navigation'>Навигация</p>
                <div className="div_navigation_lists">
                    <div className="div_list">
                        <img src="/image/home_icons.png" alt="" className='icons_navigation'/>
                        <Link to="/">Главная</Link>
                    </div>
                    <div className="div_list">
                        <img src="/image/book_icons.png" alt="" className='icons_navigation'/>
                        <Link to="/catalog">Каталог</Link>
                    </div>
                    <div className="div_list">
                        <img src="/image/author_icons.png" alt="" className='icons_navigation'/>
                        <Link to="/authors">Авторы</Link>
                    </div>
                    <div className="div_list">
                        <img src="/image/profile_icons.png" alt="" className='icons_navigation'/>
                        <Link to="/profile">Профиль</Link>
                    </div>
                    {isAdmin && (
                    <div className="div_list">
                        <img src="/image/admin_icons.png" alt="" className='icons_navigation'/>
                        <Link to="/admin">Админ-панель</Link>
                    </div>
                    )}
                </div>
            </header>
            <div className="div_main">
                      <div className="block_header">
                                      
                                      <div className="div_center">
                                         <Link to={'/'}> <img src="/image/logo.png" alt="" className='logo'/></Link>
                                          <p className='title_logo'>Потрясающая книга</p>
                                      </div>
                                     <div className="div_button">
                                      {(
                                           token? <button className='button_auth' onClick={handleLogout}>Выйти</button>  : <Link to="/authorization"><button className='button_auth'>Войти</button></Link> 
                                      )}
                                      
                                      </div>
                                      
                         
                                  </div> 
                                  <img src="/image/elipse_back_block_four.png" alt="" className="ellipse_back_profile"/>
                       
                      </div>  
        </>
    );
}

export default Header;
