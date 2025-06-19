import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../catalog/LoadingScreen";



const Watch = () => {
    const [books,setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchLooked = async ()=>{
            try {
                const response = await fetch('http://localhost:5000/api/watchBook',{
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if(!response.ok){
                    const errorData = await response.json();
                    console.log(errorData);
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLooked();
        const loadResources = async () => {
           
            setTimeout(() => {
                setLoading(false);
            }, 500); 
        };

        loadResources();
    },[]);
    return (
        <>
        {loading ? <LoadingScreen /> : (
        <>
            {books.length>0 ? <div className="books_author"> 
                            {books.map(book =>(
                            <div key={book._id} className="book_author">
            
                               <div className="avatar-container">
                                <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview1' />
                                <Link to={`/book/${book._id}`} >
                                    <div className="overlay" >  
                                        <p>Продолжить чтение</p>                            
                                </div>
                                </Link>
                                    </div> 
                                <p className="p_title">{book.title}</p>
                                
                            </div> 
                        ))} </div> : 
                        <div className="div_none_book">
                            <h1 className="title_book_none">Вы пока не добавили не одной книги</h1> 
                        </div>
                        }
        </>
        )}
        </>
    );
}

export default Watch;
