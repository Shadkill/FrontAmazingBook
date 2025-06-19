import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className='footer_desktop'>
            <footer>
                <div className="div_content_footer_top">
                    <div className="div_logo_footer">
                    <Link to={'/'} className='a_footer_list'><img src="/image/logo_footer.png" alt="" className='logo_footer'/></Link>
                    <p className='title_footer_logo'>Потрясающая книга</p>
                </div>
                <div className="div_content_one_list_footer">
                    <p className="title_list_footer">
                        Навигация 
                    </p>
                    <Link to={'/'} className='a_footer_list'>Главная</Link>
                    <Link to={'/catalog'} className='a_footer_list'>Каталог</Link>
                    <Link to={'/authors'} className='a_footer_list'>Авторы</Link>
                </div>
                <div className="div_content_one_list_footer">
                    <p className="title_list_footer">
                        Информация
                    </p>
                    <Link to={'/forAuthors'} className='a_footer_list'>Для авторов</Link>
                    <Link to={'/forReaders'} className='a_footer_list'>Для читателей</Link>
                </div>
                <div className="div_content_one_list_footer">
                    <p className="title_list_footer">
                        Контакты
                    </p>
                    <div className="div_social_network_footer">
                    <a 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText("neizvestnyjneizvestnost172@gmail.com")
                            .then(() => toast.success("Почта скопирована!"))
                            .catch(() => toast.error("Ошибка копирования!"));
                        }}
                    >
  <img src="/image/icon_email.png" alt="Скопировать почту" className="network_icon" />
</a>
                    <Link to={'https://t.me/AmazingBookRus'}><img src="/image/icon_telegram.png" alt="" className='network_icon'/></Link>
                    <Link to={'https://vk.com/AmazingBookRus'}><img src="/image/icon_vk.png" alt="" className='network_icon'/></Link>
                    </div>
                </div>
                </div>
                <img src="/image/ark_footer.png" alt="" className='ark_footer'/>
                <div className="div_bottom_footer">
                    <Link to={'/privacyPolicy'} className='a_footer_list'>Политика конфиденциальности</Link>
                    <p className='a_footer_list'>2025 © Потрясающая книга</p>
                    <Link to={'/userAgreement'} className='a_footer_list'>Пользовательское соглашение</Link>
                </div>
                
                
            </footer>
        </div>
    );
}

export default Footer;
