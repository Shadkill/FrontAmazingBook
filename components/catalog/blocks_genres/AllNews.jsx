
import '../style.css'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import SearchCatalog from '../SearchCatalog';
import Header from '../../header/Header';
import Footer from '../../footer/Footer'
import BlockHeaderMobile from '../../mobile/BlockHeaderMobile';
import FooterMobile from '../../mobile/FooterMobile';
const AllNews = () => {
    const [news, setNews] = useState([]);
    const token = localStorage.getItem("token");

    const handleLogout =()=>{
        localStorage.removeItem("token");
        window.location.href = "/";
    }
      
        useEffect(()=>{
           const getNewsBooks = async()=>{
            try{
                const response = await fetch('http://localhost:5000/api/newBooks',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok){
                    const errorData = await response.json();
                    return console.log(errorData);
                }
                const data = await response.json();
                setNews(data);
            }catch(error){
                console.log(error);
            }
           }
           getNewsBooks();
        },[])
    return (
        <>
            <Header/>
            <BlockHeaderMobile/>
           
            <div className="div_block_news_main">
            
            <SearchCatalog/>
            <p className='title_catalog'>Новинки</p>
                    <div className='block_news1'>
                        {news.length>0?
                        
                        news.map(book =>(
                            
                            <div className="div_book" key={book._id}>
                    
                            <div className="avatar-container" >
                                            <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview' />
                                             <Link to={`/book/${book._id}`}>
                                                <div className="overlay">
                                                    
                                                        </div>
                                                        </Link>
                                                            </div> 
                            <p className="p_title">{book.title.length > 22 ? `${book.title.slice(0, 20)}...` : book.title}</p>
                        </div>
                        ))
                        : 
                        <div className="div_none_book">
                            <h1>Новинок пока нет</h1> 
                        </div>
                        }
                       
                    </div>
                   
                    </div>
                    <Footer/>
                    <FooterMobile/>
        </>
    );
}

export default AllNews;
