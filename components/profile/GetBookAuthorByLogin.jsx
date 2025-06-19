import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const GetBookAuthorByLogin = () => {
    const [books, setBooks] = useState([]);
    const {login} = useParams();

    useEffect(()=>{
        const bookAuthor = async()=>{
            try {
                const response = await fetch(`http://localhost:5000/api/bookByAuthorLogin/${login}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
        bookAuthor();
    },[login]);
   
    return (
        <>
              <div className="div_looked1">
                    <div className="div_left_profile1">
                        <p className="p_looked1">Работы автора</p>
                    
                </div>
                
                
                </div>
                <img src="/image/ark_profile.png" alt="" className="ark_profile"/>
                <div className="block_two_profile">
                {books.length>0 ? <div className="books_author"> 
                                {books.map(book =>(
                                <div key={book._id} className="book_author">
                
                                   <div className="avatar-container">
                                    <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview1' />
                                    <Link to={`/book/${book._id}`} >
                                        <div className="overlay" >                              
                                    </div>
                                    </Link>
                                        </div> 
                                    <p className="p_title">{book.title}</p>
                                    
                                </div> 
                            ))} </div> : 
                            <div className="div_none_book">
                                <h1 className='h1_none_news'>У автора пока нет книг</h1> 
                            </div>
                            }
                </div>
        </>
    );
}

export default GetBookAuthorByLogin;
