import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DropDawn from "../DropDawn";

const GetBookByGenre = () => {
    const {id} = useParams();
    const [books, setBooks] = useState([]);
    const [genre, setGenre] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks]= useState([]);
    const fetchBooks = async(genreId)=>{
        
        setBooks([]);
       
        try {
            const response = await fetch(`http://localhost:5000/api/genreBook/${genreId}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseGenre = await fetch(`http://localhost:5000/api/genre/${genreId}`,{
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
            if(!responseGenre.ok){
                const errorData = await responseGenre.json();
                toast.error(errorData);
                return;
            }
            const data = await response.json();
            const dataGenre = await responseGenre.json();
            setBooks(data);
            setGenre(dataGenre); 
        } catch (error) {
            console.log(error);
        }
    } 
    useEffect(()=>{
        setFilteredBooks([]);
        if(books.length>0){
           
            setFilteredBooks (books.filter(book => 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()))

        );
        }
        
    },[books,searchTerm]);
    
    useEffect(()=>{
        if(id){
            fetchBooks(id);
        }
        
    },[id])
   
   

    return (
        <>
        <div>
              <div className="div_top_block_authors">
                                <h1 className='title_authors_page'>Каталог</h1>
                                <div className="div_inputs_block_catalog">

                                
                                <div className="div_search">
                                
                                <form action="" className="div_search_in" onSubmit={(e) => e.preventDefault()}>
                                <button type='submit' className='search_but'>
                                        <img src="/image/search_icon.png" alt="" className='search_img'/>
                                    </button>
                                    <input type="text" placeholder='Поиск' className='search_input1' value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}/>
                                    </form>
                                </div>
                               <DropDawn />
                               </div>
                            </div>
        </div>
        <div className="block_book_genre">
        <p className="title_catalog">{genre.genre}</p>
        <div className="block_news1">

        
        {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div className="div_book" key={book._id}>
                            <div className="avatar-container">
                                <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview1' />
                                <Link to={`/book/${book._id}`}>
                                    <div className="overlay"></div>
                                </Link>
                            </div>
                            <p className="p_title">{book.title.length > 22 ? `${book.title.slice(0, 20)}...` : book.title}</p>
                        </div>
                    ))
                ) : (
                    <p className="p_none">Книг данного жанра пока нет</p>
                )}
                                    </div>
        </div>
        </>
    );
}

export default GetBookByGenre;
