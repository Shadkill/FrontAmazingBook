import React from 'react';
import Header from '../header/Header';
import UserGetControl from './component/userGetControl';
import AuthorGetControl from './component/authorGetControl';
import Footer from '../footer/Footer';

const UserControl = () => {
    return (
        <>
            <Header/>
            <div className="div_user_control">
                
                    <h1>Управление пользователями</h1>
                <UserGetControl/> 
                <AuthorGetControl/>
            </div>
            <Footer/>
        </>
    );
}

export default UserControl;
