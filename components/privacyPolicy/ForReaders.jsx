import React from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';

const ForReaders = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    return (
        <div className='gradient_div_privacy'>
        <img src="/image/elipse_top_about.png" alt="" className='img_ellipse_privacy'/>
            <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                    <img src="/image/logo.png" alt="" className='logo'/>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
            </header>
            <BlockHeaderPrivacyMobile/>
             <div className="div_privacy">
                <h1 className='title_privacy'>Для читателей</h1>
                <img src="/image/elipse_center_privacy.png" alt="" className='ellipse_center_privacy'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    1. Регистрация и аккаунт
                    </h1>
                    <p className='paragraph_privacy'>1.1. Для доступа к расширенному функционалу (например, скачивание книг, добавление в избранное, написание отзывов) пользователям может потребоваться регистрация аккаунта.</p>
                    <p className='paragraph_privacy'>1.2. Пользователь обязуется предоставлять достоверную информацию при регистрации.</p>
                    <p className='paragraph_privacy'>1.3. Пользователь несет ответственность за безопасность своих учетных данных.</p>
                </div>
                
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    2. Использование контента
                    </h1>
                    <p className='paragraph_privacy'>2.1. Все материалы на Сайте предоставляются только для личного использования.</p>
                    <p className='paragraph_privacy'>2.2. Пользователю запрещается:</p>
                    <div className='lis'>
                            <li>копировать, распространять или изменять материалы без разрешения правообладателя;</li>
                        <li>использовать контент в коммерческих целях.</li>
                    </div>
                    <p className='paragraph_privacy'>2.3. Сайт предоставляет доступ к книгам на бесплатной и платной основе, в зависимости от условий публикации авторов.</p>
                    
                </div>
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    3. Персональные данные
                    </h1>
                    <img src="/image/elipse_back_bottom_privacy.png" alt="" className='ellipse_bottom'/>
                    <p className='paragraph_privacy'>3.1. Персональные данные пользователей обрабатываются в соответствии с Политикой конфиденциальности.</p>
                    <p className='paragraph_privacy'>3.2. Используя Сайт, Пользователь дает согласие на обработку своих данных.</p>
                </div>
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    4. Ограничения ответственности
                    </h1>
                    <p className='paragraph_privacy'>4.1. Администрация Сайта не несет ответственности за содержание материалов, размещенных авторами.</p>
                </div>
               
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    5. Изменения условий
                    </h1>
                    <p className='paragraph_privacy'>5.1. Условия использования могут быть изменены. Обновленная версия вступает в силу с момента ее публикации на Сайте.</p>
                    <p className='paragraph_privacy1'>5.2. Пользователь считается уведомленным о внесенных изменениях при продолжении использования Сайта.</p>
                </div>
             </div>
        </div>
    );
}

export default ForReaders;
