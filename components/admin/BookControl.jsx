import React from 'react';
import Header from '../header/Header';
import BookGetControl from './component/bookGetControl';

const BookControl = () => {
    return (
        <>
            <Header/>
            <div className="div_title_admins">
                <h1>Управление книгами</h1>
                </div>
                
            <div className="div_title_admin">
                
                
                
            <BookGetControl/>
            </div>
            
        </>
    );
}

export default BookControl;
