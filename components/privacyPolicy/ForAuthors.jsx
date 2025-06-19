import React from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const ForAuthors = () => {
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
                <h1 className='title_privacy'>Для авторов</h1>
                <img src="/image/elipse_center_privacy.png" alt="" className='ellipse_center_privacy'/>
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    1. Размещение произведений
                    </h1>
                    <p className='paragraph_privacy'>1.1. Автор может разместить свои произведения (книги, рассказы, статьи и др.) на Сайте для публикации и/или продажи.</p>
                    <p className='paragraph_privacy'>1.2. Размещая контент, Автор подтверждает, что является его единственным правообладателем или обладает всеми необходимыми правами для публикации.</p>
                    <p className='paragraph_privacy'>1.3. Запрещается размещать материалы, которые:</p>
                    <div className='lis'>
                            <li>нарушают права третьих лиц (авторские, интеллектуальные, личные и др.);</li>
                        <li>содержат незаконный, оскорбительный, дискриминационный или иной неподобающий контент.</li>
                    </div>
                </div>
                
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    2. Авторские права
                    </h1>
                    <p className='paragraph_privacy'>2.1. Все права на размещенные произведения остаются за Автором.</p>
                    <p className='paragraph_privacy'>2.2. Автор предоставляет Сайту право на публикацию и распространение контента в рамках использования платформы.</p>
                    <p className='paragraph_privacy'>2.3. При необходимости, Автор может запросить удаление своих произведений, и Администрация обязуется выполнить запрос в разумный срок.</p>
                    
                </div>
                
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    3. Обязанности Автора
                    </h1>
                    <img src="/image/elipse_back_bottom_privacy.png" alt="" className='ellipse_bottom'/>
                    <p className='paragraph_privacy'>3.1. Автор обязуется:</p>
                    <div className='lis'>
                            <li>предоставлять достоверную информацию о себе и своих произведениях;</li>
                        <li>своевременно уведомлять Администрацию о любых изменениях, связанных с правами на размещенные произведения.</li>
                    </div>
                    <p className='paragraph_privacy'>3.2 Автор несет ответственность за все претензии, связанные с нарушением авторских прав, прав третьих лиц или законодательства.</p>
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
               
                <div className="div_content_one">
                    <h1 className="title_bottom_privacy">
                    5. Изменения условий
                    </h1>
                    <p className='paragraph_privacy1'>5.1. Условия сотрудничества с Авторами могут быть изменены. Обновленные условия публикуются на Сайте, и Автор считается уведомленным с момента их публикации.</p>
                </div>
             </div>
        </div>
    );
}

export default ForAuthors;
