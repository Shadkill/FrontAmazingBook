import React from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const UserAgreement = () => {
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
                <h1 className='title_privacy'>Пользовательское соглашение</h1>
                <img src="/image/elipse_center_privacy.png" alt="" className='ellipse_center_privacy'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                        1. Общие положения
                    </h1>
                    <p className='paragraph_privacy'>1.1 Настоящее соглашени регулирует порядок использование сайта " Потрясающая книга ".</p>
                    <p className='paragraph_privacy'>1.2. Использование Сайта означает полное согласие Пользователя с условиями данного соглашения. Если вы не согласны с этими условиями, прекратите использование Сайта.</p>
                </div>
                
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                        2. Регистрация и аккаунт
                    </h1>
                    <p className='paragraph_privacy'>2.1. Для доступа к дополнительным функциям Сайта может потребоваться регистрация аккаунта.</p>
                    <p className='paragraph_privacy'>2.2. Пользователь обязуется предоставлять достоверную и актуальную информацию при регистрации.</p>
                    <p className='paragraph_privacy'>2.3. Пользователь несет ответственность за безопасность своих учетных данных и за все действия, совершаемые под его аккаунтом.</p>
                </div>
                <img src="/image/elipse_back_bottom_privacy.png" alt="" className='ellipse_bottom'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    3. Использование контента
                    </h1>
                    <p className='paragraph_privacy'>3.1. Все материалы, представленные на Сайте, защищены авторским правом и/или иными правами интеллектуальной собственности.</p>
                    <p className='paragraph_privacy'>3.2. Пользователь имеет право читать и скачивать книги только для личного некоммерческого использования.</p>
                    <p className='paragraph_privacy'>3.3. Запрещается воспроизводить, распространять, изменять или использовать материалы cайта без разрешения правообладателей.</p>
                </div>
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    4. Обязательства Пользователя
                    </h1>
                    <p className='paragraph_privacy'>4.1. Пользователь обязуется:</p>
                    <div className='lis'>
                            <li>не размещать на Сайте незаконный, оскорбительный или ненадлежащий контент;</li>
                        <li>не использовать Сайт для рассылки спама, вирусов или другой вредоносной активности.</li>
                    </div>
                    <p className='paragraph_privacy'>4.2. Пользователь соглашается соблюдать действующее законодательство и нормы настоящего соглашения</p>
                </div>
                <img src="/image/elipse_center_privacy.png" alt="" className='ellipse_center_privacy'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    5. Ограничение ответственности
                    </h1>
                    <p className='paragraph_privacy'>5.1. Администрация Сайта не несет ответственности за возможные технические сбои, потерю данных или ущерб, возникший в результате использования Сайта.</p>
                    <p className='paragraph_privacy'>5.2. Администрация оставляет за собой право изменять, приостанавливать или прекращать доступ к Сайту без предварительного уведомления.</p>
                </div>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    6. Персональные данные
                    </h1>
                    <p className='paragraph_privacy'>6.1. Сайт собирает и обрабатывает персональные данные в соответствии с Политикой конфиденциальности.</p>
                    <p className='paragraph_privacy'>6.2. Используя Сайт, Пользователь соглашается на обработку своих персональных данных.</p>
                </div>
                <img src="/image/elipse_back_bottom_privacy.png" alt="" className='ellipse_bottom'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    7. Изменения в соглашении
                    </h1>
                    <p className='paragraph_privacy'>7.1. Администрация Сайта оставляет за собой право изменять условия настоящего соглашения.</p>
                    <p className='paragraph_privacy'>7.2. Обновленная версия соглашения вступает в силу с момента ее публикации на Сайте.</p>
                </div>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    8. Контактная информация
                    </h1>
                    <p className='paragraph_privacy1'>8.1. По всем вопросам, связанным с работой Сайта и настоящим соглашением, вы можете связаться с нами через раздел Контакты.</p>
                </div>
             </div>
        </div>
    );
}

export default UserAgreement;
