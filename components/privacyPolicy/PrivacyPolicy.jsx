import React from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const PrivacyPolicy = () => {
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
                <h1 className='title_privacy'>Политика конфиденциальности</h1>
                <img src="/image/elipse_center_privacy.png" alt="" className='ellipse_center_privacy'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                        1. Общие положения
                    </h1>
                    <p className='paragraph_privacy'>1.1. Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта «Потрясающая книга»</p>
                    <p className='paragraph_privacy'>1.2. Использование Сайта означает согласие Пользователя с условиями данной Политики конфиденциальности.</p>
                </div>
                
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    2. Сбор персональных данных
                    </h1>
                    <p className='paragraph_privacy'>2.1. Сайт может собирать следующие данные о Пользователе:</p>
                    <div className='lis'>
                            <li>ФИО, адрес электронной почты, номер телефона (при регистрации или заполнении форм обратной связи);</li>
                        <li>техническую информацию (IP-адрес, данные о браузере, операционной системе, время доступа);</li>
                        <li>файлы cookie для обеспечения работы Сайта.</li>
                    </div>
                </div>
                <img src="/image/elipse_back_bottom_privacy.png" alt="" className='ellipse_bottom'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    3. Цели обработки данных
                    </h1>
                    <p className='paragraph_privacy'>3.1. Персональные данные используются для:</p>
                    <div className='lis'>
                            <li>предоставления доступа к функционалу Сайта;</li>
                        <li>связи с Пользователем по вопросам, связанным с работой Сайта;</li>
                        <li>улучшения качества работы Сайта и анализа пользовательской активности;</li>
                        <li>выполнения юридических обязанностей.</li>
                    </div>
                </div>
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    4. Передача данных третьим лицам
                    </h1>
                    <p className='paragraph_privacy'>4.1. Сайт обязуется не передавать персональные данные Пользователей третьим лицам за исключением случаев:</p>
                    <div className='lis'>
                            <li>если это требуется для исполнения соглашения с Пользователем (например, передача данных для доставки книги);</li>
                            <li>по запросу уполномоченных государственных органов в соответствии с законодательством;</li>
                        <li>при передаче данных сервисам-обработчикам (например, для аналитики или обработки платежей), при условии их обязательства соблюдать конфиденциальность.</li>
                    </div>
                    <p className='paragraph_privacy'>4.2. Пользователь соглашается соблюдать действующее законодательство и нормы настоящего соглашения</p>
                </div>
                <img src="/image/elipse_center_privacy.png" alt="" className='ellipse_center_privacy'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    5. Обеспечение безопасности данных
                    </h1>
                    <p className='paragraph_privacy'>5.1. Сайт принимает все необходимые меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
                    <p className='paragraph_privacy'>5.2. Для защиты данных используются современные технологии шифрования и безопасные соединения (SSL).</p>
                </div>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    6. Файлы cookie
                    </h1>
                    <p className='paragraph_privacy'>6.1. Сайт использует файлы cookie для упрощения взаимодействия Пользователя с Сайтом и предоставления персонализированного контента.</p>
                    <p className='paragraph_privacy'>6.2. Пользователь может отключить использование файлов cookie в настройках своего браузера, однако это может ограничить доступ к некоторым функциям Сайта.</p>
                </div>
                <img src="/image/elipse_back_bottom_privacy.png" alt="" className='ellipse_bottom'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    7. Права Пользователей
                    </h1>
                    <p className='paragraph_privacy'>7.1. Пользователь имеет право:</p>
                    <div className='lis'>
                            <li>получить информацию о своих данных, хранящихся на Сайте;</li>
                            <li>требовать обновления, исправления или удаления своих персональных данных;</li>
                        <li>отозвать согласие на обработку данных.</li>
                    </div>
                    <p className='paragraph_privacy'>7.2. Для реализации своих прав Пользователь может связаться с администрацией Сайта через раздел Контакты.</p>
                </div>
                <img src="/image/elipse_center_privacy.png" alt="" className='ellipse_center_privacy'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    8. Срок хранения данных
                    </h1>
                    <p className='paragraph_privacy'>8.1. Персональные данные хранятся не дольше, чем это требуется для целей их обработки, за исключением случаев, предусмотренных законодательством.</p>
                </div>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    9. Изменения в Политике конфиденциальности
                    </h1>
                    <p className='paragraph_privacy'>9.1. Администрация Сайта оставляет за собой право изменять настоящую Политику конфиденциальности.</p>
                    <p className='paragraph_privacy1'>9.2. Новая редакция Политики вступает в силу с момента ее публикации на Сайте.</p>
                </div>
             </div>
        </div>
    );
}

export default PrivacyPolicy;
