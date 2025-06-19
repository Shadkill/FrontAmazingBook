import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const AllGenres = () => {
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState({});
    
    useEffect(()=>{
        const fetchGenres = async()=>{
            try {
                const response = await fetch('http://localhost:5000/api/getAllGenres',{
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
                setGenres(data);
                
                for (const genre of data) {
                    await fetchBooks(genre._id); // Получаем книги для текущего жанра
                }
            } catch (error) {
                console.log(error);
            }
          
        };
        fetchGenres();
    },[]);

  

    
    const fetchBooks = async(genreId)=>{
        if (books[genreId]) return;
        try {
            const response = await fetch(`http://localhost:5000/api/genreBook/${genreId}`,{
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
            if(data.length > 0){
            setBooks(prev => ({
                ...prev,
                [genreId]: data.slice(-4) // Срезаем последние 4 книги
            }));
        }
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <>
           {genres.map(genre => (
                <div className="block_book_genre" key={genre._id}>
                    <p className="title_catalog">{genre.genre}</p>
                    <div className="block_news">
                        {/* Отображаем книги для данного жанра */}
                        {books[genre._id] && books[genre._id].length > 0 ? (
                            books[genre._id].map(book => (
                                <div className="div_book" key={book._id}>
                                    <div className="avatar-container">
                                    <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview' />
                                     <Link to={`/book/${book._id}`}>
                                        <div className="overlay">
                                            
                                                </div>
                                                </Link>
                                                    </div> 
                                   
                                        <p className="p_title">{book.title.length > 22 ? `${book.title.slice(0, 20)}...` : book.title}</p>
                                    </div>
                            ))
                        ) : (
                            

                            <div className="div_none_book">
                                <p className="p_none">Книг данного жанра пока нет</p>
                            </div>
                            
                            
                        )}
                    </div>
                    <div className="div_button">
           
        <Link to={`/catalog/${genre._id}`}><button className='button_more'>Показать больше</button></Link>
            
        
        </div>
                </div>
            ))}
           
        </>
    );
}

export default AllGenres;
