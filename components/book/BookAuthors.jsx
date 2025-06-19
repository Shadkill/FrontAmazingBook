import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import './style.css'

const BookAuthors = () => {
    const {id} = useParams();
    const [books,setBooks] = useState([]);
    const [loginAuthor, setLoginAuthor] = useState('');
    useEffect(()=>{
        const getBooksByAuthor = async()=>{

            try {
                const response = await fetch(`http://localhost:5000/api/bookByAuthor/${id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok){
                    const errorData = await response.json();
                    toast.error(errorData);
                    return;
                }
                const data = await response.json();
                setBooks(data.bookAuthor.slice(-3));
                setLoginAuthor(data.author.login);
            } catch (error) {
                console.error(error);
            }
        }
        getBooksByAuthor();
    })
    return (
        <>
            <div className="div_looked">
                    <div className="div_author_book">
                        <p className="p_looked" >Книги от этого автора</p>
                    
                </div>
                </div>
                <img src="/image/ark_profile.png" alt="" className="ark_profile"/>
                <div className="block_book_author_book">
                <div className="block_two_book">
                 {books && books.length > 0 ? (
                                            books.map(book => (
                                                <div className="div_book" key={book._id}>
                                                    <div className="avatar-container">
                                                    <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview' />
                                                     <Link to={`/book/${book._id}`} >
                                                        <div className="overlay" >  
                                                            
                                                                </div>
                                                                </Link>
                                                                    </div> 
                                                   
                                                        <p className="p_title">{book.title.length > 22 ? `${book.title.slice(0, 20)}...` : book.title}</p>
                                                    </div>
                                            ))
                                        ) : (
                                            
                
                                            
                                            <p className="p_none">Книг данного автора пока нет</p>
                                            
                                        )}
                                         
                                        </div>
                                        <div className="div_button">
           
                                                        <Link to={`/authors/${loginAuthor}`}><button className='button_more'>Показать больше</button></Link>
               
           
                                                        </div>
                                        </div>
                                       
        </>
    );
}

export default BookAuthors;
