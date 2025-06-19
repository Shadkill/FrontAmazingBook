import { Link } from 'react-router-dom';
import '../style.css'
import { useEffect,useState } from 'react';

const NewsCatalog = () => {
    const [news, setNews] = useState([]);
    const [limit, setLimit] = useState([]);
  
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
            setLimit(data?.slice(0,4));
        }catch(error){
            console.log(error);
        }
       }
       getNewsBooks();
    },[])
    return (
        <div className="div_block_news_main1">

       
        <div className='block_news'>
            {news.length>0?
            
            limit.map(book =>(
                
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
                <h1 className='h1_none_news'>Новинок пока нет</h1> 
            </div>
            }
           
        </div>
       
        <div className="div_button">
           
        <Link to={'/catalog/allNews'}><button className='button_more'>Показать больше</button></Link>
            
        
        </div>
        
        </div>
    );
}

export default NewsCatalog;
