import React from 'react';
import Header from '../header/Header';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import MobileRestriction from '../mobileRestriction/mobileRestriction';
const AdminPanel = () => {
    
    return (
        <>
        <MobileRestriction/>
          <Header/>
          <div className="block_admin_panel">
            <h1>Админ панель</h1>
            <div className="div_buttons_admin">
              <Link to={'/genreControl'}><button className='button_page_admin'>Управление жанрами</button></Link>
              <Link to={'/bookControl'}><button className='button_page_admin'>Управление книгами</button></Link>
              <Link to={'/userControl'}><button className='button_page_admin'>Управление пользователями</button></Link>
              
            </div>
          </div>
        </>
    );
}

export default AdminPanel;
