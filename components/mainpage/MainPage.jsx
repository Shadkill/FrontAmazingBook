import {Link, useNavigate} from 'react-router-dom';
import './style.css'
import Header from '../header/Header';
import  { useEffect, useState } from 'react';
import Footer from '../footer/Footer';

import HeaderMobileMain from '../mobile/HeaderMobileMain';
import NewsCatalog from '../catalog/blocks_genres/NewsCatalog';
import FooterMobile from '../mobile/FooterMobile';
const MainPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    const handleScroll = () => {
        const arrowPosition = document.getElementById('arrow-container').getBoundingClientRect();
        // Проверяем, виден ли элемент на экране
        if (arrowPosition.top < window.innerHeight && arrowPosition.bottom > 0) {
            setIsVisible(true);
            window.removeEventListener('scroll', handleScroll); // Удаляем слушатель после активации
        }
        
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className='parent'>
            <HeaderMobileMain/>
            <div className="gradient_div">

            <Header/>
           
            <div className="div_main">
            
                        <img src="/image/elipse_back_block_four.png" alt="" className="ellipse_back_profile"/>
             
            </div>
           <div className="block_one_main">
            <div className="div_left_block_one">
                <p className="title_block_one">Потрясающая книга - мир <br /> увлекательных историй</p>
                <p className='content_text_block_one'>Откройте для себя книги, которые превращают чтение <br /> в настоящее приключение. Яркие персонажи, <br /> захватывающие сюжеты и невероятные миры ждут вас!</p>
                <div id="arrow-container">
                    <img src="/image/arrow.png"  id="arrow" alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 2s ease' }}/>
                </div>
                
            </div>
            <div className="div_right_block_one">
                <div className="div_img_block_one">
                    <img src="/image/img_text_book_block_one.png" alt="" className='img_text_book_block_one'/>
                <img src="/image/img_book_z-index.png" className='img_text_book_block_one_z_index'alt="" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 2s ease' }}/>
                
                </div>
                <img src="/image/elipse_back.png" alt="" className='ellipse_back'/>
            </div>
           </div>
           <div className="block_one_main1">
            <div className="div_left_block_one">
                <p className="title_block_one">Потрясающая книга - мир  увлекательных историй</p>
               
                
                
            </div>
            <div className="div_right_block_one">
                <div className="div_img_block_one">
                    <img src="/image/img_text_book_block_one.png" alt="" className='img_text_book_block_one'/>
                <img src="/image/img_book_z-index.png" className='img_text_book_block_one_z_index'alt="" />
                
                </div>
                <img src="/image/elipse_back.png" alt="" className='ellipse_back'/>
            </div>
            <div className="div_bottom_main">
                <p className='content_text_block_one'>Откройте для себя книги, которые <br />превращают чтение  в настоящее приключение. Яркие персонажи, <br /> захватывающие сюжеты и невероятные миры ждут вас!</p>
            <div id="arrow-container">
                    <img src="/image/arrow_main_mobile.png"  id="arrow" alt="" />
                </div>
            </div>
            
           </div>
           </div>
           <div className="gradient_div_block_two">

           
           <div className="block_two">
            <div className="div_left_block_two">
                <img src="/image/img_book_block_two.png" alt="" className='img_block_two'/>
                <div className="div_ark_left" ></div>
                <div className="div_ark_right" ></div>
            </div>

           
           <div className="div_right_block_two">
            <h1 className='title_block_two'>О нас</h1>
            <p className='p_text_block_two'>Мы создаем книги, которые делают чтение <br />
             захватывающим путешествием. Каждая<br /> история
              погружает в уникальный мир с<br /> увлекательным
               сюжетом и живыми героями.<br /> Наша цель — 
               вдохновлять, удивлять и<br /> дарить новые
                впечатления, превращая<br /> каждый момент с книгой
                 в настоящее удовольствие! </p>
           </div>
           </div>
           <div className="block_ark">
           <img src="/image/img_arc_block_two.png" alt="" className='arc_block_two'/>
           </div>
           
           </div>
           <div className="gradient_div_block_two1">

           
           <div className="block_two">
           <div className="div_right_block_two">
            <h1 className='title_block_two'>О нас</h1>
            <p className='p_text_block_two'>Мы создаем книги, которые делают чтение 
             захватывающим путешествием. Каждая история
              погружает в уникальный мир с увлекательным
               сюжетом и живыми героями. Наша цель — 
               вдохновлять, удивлять и дарить новые
                впечатления, превращая каждый момент с книгой
                 в настоящее удовольствие! </p>
           </div>
            <div className="div_left_block_two">
                <img src="/image/img_book_block_two.png" alt="" className='img_block_two'/>
                <div className="div_ark_left" ></div>
                <div className="div_ark_right" ></div>
            </div>

           
          
           </div>
           <div className="block_ark">
           <img src="/image/arc_block_two_mobile.png" alt="" className='arc_block_two'/>
           </div>
           
           </div>
           <div className="block_three">
                            <p className='title_catalog'>Новинки</p>
                            
                            <NewsCatalog/>
                            
                            </div>
           <div className="div_block_three_arc">
                <img src="/image/arc_block_main.svg" alt="" className='arc_block_three'/>
            </div>
            
            <div className="block_four">
                <div className="div_left_block_four">
                    <div className="div_img_block_four">
                       <img src="/image/image_left_block_four.png" alt="" className='image_left_block_four'/>
                    <img src="/image/image_right_block_four.png" alt="" className='image_right_block_four'/> 
                    </div>
                    
                </div>
                <div className="div_right_block_four">
                    <h1 className='title_block_four'>Почему мы?</h1>
                    <div className="div_lists_star">
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Уникальные истории - наши книги захватывают с <br /> первой страницы и оставляют яркие впечатления.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Погружение в сюжет — проработанные миры<br /> и персонажи создают незабываемый опыт.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Удобство и доступность — читайте в любое<br /> время и в любом месте на своем устройстве.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Инновационный подход — мы используем <br />современные технологии, чтобы сделать чтение<br /> еще интереснее.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Любовь к книгам — каждая книга создана с <br />душой и вниманием к деталям, чтобы вдохновлять<br /> и радовать!</p>
                        </div>
                    </div>
                </div>
               <img src="/image/elipse_back_block_four.png" alt="" className='ellipse_block_four'/>
            </div>
            <div className="block_four1">
                
                <div className="div_right_block_four">
                    <h1 className='title_block_four'>Почему мы?</h1>
                    <div className="div_lists_star">
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Уникальные истории - наши книги захватывают с  первой страницы и оставляют яркие впечатления.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Погружение в сюжет — проработанные миры и персонажи создают незабываемый опыт.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Удобство и доступность — читайте в любое время и в любом месте на своем устройстве.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Инновационный подход — мы используем современные технологии, чтобы сделать чтение еще интереснее.</p>
                        </div>
                        <div className="div_list_star">
                            <img src="/image/star.png" alt="" className='star_icon'/>
                            <p className='p_list_star'>Любовь к книгам — каждая книга создана с душой и вниманием к деталям, чтобы вдохновлять и радовать!</p>
                        </div>
                    </div>
                </div>
                <div className="div_left_block_four1">
                    <div className="div_img_block_four">
                       <img src="/image/image_left_block_four.png" alt="" className='image_left_block_four'/>
                    <img src="/image/image_right_block_four.png" alt="" className='image_right_block_four'/> 
                    </div>
                    
                </div>
               
            </div>
          
                <Footer/>
                <FooterMobile/>
            
            
           </div>
        
    );
}

export default MainPage;
