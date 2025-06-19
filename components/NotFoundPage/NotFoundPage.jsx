import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
    return (
        <>
        <div className="div_not_found">
        <img src="/image/Not_found_bella.png" alt="" className='not_found_image'/>
        <div className="div_text_not_found">
            <h1>Страница не найдена</h1>
            <h1>404</h1>
            <Link to={'/'}>Вернуться на главную</Link>
        </div>
        </div>
            
        </>
    );
}

export default NotFoundPage;
