import { Link } from "react-router-dom";


const FooterMobile = () => {
    return (
        <div className="footer_mobile">
             <footer>
                            <div className="div_content_footer_top">
                                <div className="div_logo_footer">
                                <Link to={'/'} className='a_footer_list'><img src="/image/logo_footer.png" alt="" className='logo_footer'/></Link>
                                <p className='title_footer_logo'>Потрясающая книга</p>
                            </div>
                            <div className="div_content_mobile">
                            <div className="div_content_one_list_footer">
                                <p className="title_list_footer">
                                    Навигация 
                                </p>
                                <div className="div_a_footer">
                                <Link to={'/'} className='a_footer_list'>Главная</Link>
                                <Link to={'/catalog'} className='a_footer_list'>Каталог</Link>
                                <Link to={'/authors'} className='a_footer_list'>Авторы</Link>
                                </div>
                            </div>
                            <div className="div_content_one_list_footer">
                                <p className="title_list_footer">
                                    Информация
                                </p>
                                <div className="div_a_footer">
                                <Link to={'/forAuthors'} className='a_footer_list'>Для авторов</Link>
                                <Link to={'/forReaders'} className='a_footer_list'>Для читателей</Link>
                                </div>
                            </div>
                            </div>
                            <div className="div_ark_footer">
                            <img src="/image/ark_footer_mobile.png" alt="" className='ark_footer'/>
                            </div>
                            <div className="div_bottom_footer_block">
                            <div className="div_content_one_list_footer">
                                <p className="title_list_footer">
                                    Контакты
                                </p>
                                <div className="div_social_network_footer">
                                <Link to={'/'}><img src="/image/icon_email.png" alt="" className='network_icon'/></Link>
                                <Link to={'/'}><img src="/image/icon_telegram.png" alt="" className='network_icon'/></Link>
                                <Link to={'https://vk.com/club228685221'}><img src="/image/icon_vk.png" alt="" className='network_icon'/></Link>
                                </div>
                            </div>
                            
                            
                            <div className="div_bottom_footer">
                                <div className="div_link_bottom">
                                <Link to={'/privacyPolicy'} className='a_footer_list'>Политика конфиденциальности</Link>
                                
                                <Link to={'/userAgreement'} className='a_footer_list'>Пользовательское соглашение</Link>
                                </div>
                                <p className='a_footer_list'>2025 © Потрясающая книга</p>
                            </div>
                            </div>
                            </div>
                            
                        </footer>
        </div>
    );
}

export default FooterMobile;
