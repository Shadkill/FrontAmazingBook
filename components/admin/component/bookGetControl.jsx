import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ModalBanBook from './ModalBanBook';
import ModalUnBanBook from './ModalUnBanBook';
import ModalDelete from '../../profile/component/ModalDelete';
import SearchAuthorsBook from './SearchAuthorsBook';
import SearchBooks from './SearchBooks';

const BookGetControl = () => {
    const [books, setBooks] = useState([]);
    const [hoveredBookId, setHoveredBookId] = useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isModalUnBanOpen,setIsModalUnBanOpen] = useState(false)
    const [bookBan,setBookBan] = useState(null);
    const [bookId,setBookId] = useState(null); 
    const [isModalDeleteBook,setIsModalDeleteBook] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [search,setSearch] = useState('');
    const [allowedBooks,setAllowedBooks] = useState([]);
    const token = localStorage.getItem('token');
    const [searchBook,setSearchBook] = useState(''); 
    const [banDescription,setBanDescription] = useState(''); 
    const targetRef = useRef(null);
    const targetRefUnBan = useRef(null);
       const scrollToElement = ()=>{
           targetRef.current?.scrollIntoView({behavior:'smooth'})
       }
       const scrollToElementUnBan = ()=>{
        targetRefUnBan.current?.scrollIntoView({behavior:'smooth'})
    }
    const handleDeleteClick = async (book)=>{
        setBookToDelete(book);
        setIsModalDeleteBook(true);
        
    }
    const handleDeleteConfirm = async(e)=>{
        e.preventDefault();
        const toastLoad = toast.loading('Отправка данных...');
        try {
            const response = await fetch(`http://localhost:5000/api/deleteBook/${bookToDelete._id}`,{
                method:'DELETE',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message, {id:toastLoad});
                return;
            }
            const data = await response.json();
            toast.success(data.message,{id:toastLoad});
            await bookGet();
            await bookGetUnBan();
        } catch (error) {
            console.error(error);
        }finally {
            setIsModalOpen(false);
            setBookToDelete(null);
            isModalDeleteBook(false)
        }
    }
   
   
    const handleBanClick = async(book)=>{
        setIsModalOpen(true);
        setBookId(book._id)
        setBookBan(book);
    }
    const handleUnBanClick = async(book)=>{
        setIsModalUnBanOpen(true);
        setBookId(book._id)
        setBookBan(book);
    }
    const searchQuery = async(e)=>{
        const value = e.target.value;
        setSearch(value);
        bookGet(value);
    }
    const searchQueryBook = async(e)=>{
        const value = e.target.value;
        setSearchBook(value);
        bookGetUnBan(value);
    }
    const bookGet = async(query='')=>{
        try {
            const response = await fetch(`http://localhost:5000/api/bookGetAdmin?query=${query}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.error);
                return;
            }
            const data =await response.json();
            setBooks(data);

        } catch (error) {
            console.error(error);
        }
    }
    const bookGetUnBan = async(query='')=>{
        try {
            const response = await fetch(`http://localhost:5000/api/bookGetAdminUnBan?query=${query}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.error);
                return;
            }
            const data =await response.json();
            setAllowedBooks(data);

        } catch (error) {
            console.error(error);
        }
    }
    
    const UnBanBook = async(e)=>{
        e.preventDefault();
        const toastLoad = toast.loading('Отправка данных...');
        try {
            const response =await fetch(`http://localhost:5000/api/unBanBook/${bookId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message,{id:toastLoad});
                return;
            }
            const data = await response.json();
            toast.success(data.message,{id:toastLoad});
            setIsModalUnBanOpen(false);
            setBookBan(null);
            setBookId(null);
            await bookGet();
            await bookGetUnBan();
        } catch (error) {
            console.error(error);
        }
    }
    const banBook = async(e)=>{
        e.preventDefault();
        const toastLoad = toast.loading('Отправка данных...')
        const payload = {
            banDescription
        }
        try {
            const response = await fetch(`http://localhost:5000/api/banBook/${bookId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message,{id:toastLoad});
                return;
            }
            const data = await response.json();
            toast.success(data.message,{id:toastLoad});
            await bookGet();
            await bookGetUnBan();
            setIsModalOpen(false);
            setBookBan(null);
            setBookId(null);
        } catch (error) {
            console.error(error);
        }
    }
    const modalClose = ()=>{
        setIsModalOpen(false);
        setBookBan(null);
        setBookId(null);
        setIsModalUnBanOpen(false);
        setIsModalDeleteBook(false);
    }
    useEffect(()=>{
        bookGet();
        bookGetUnBan();
    },[]);
    return (
        <>
        <ModalDelete
                        isOpen={isModalDeleteBook}
                        onClose={modalClose}
                        onConfirm={handleDeleteConfirm}
                        bookTitle={bookToDelete?.title || ""}
                    />
        <ModalUnBanBook
        isOpen={isModalUnBanOpen}
        onConfirm={UnBanBook}
        onClose={modalClose}
        BookTitle={bookBan?.title ||''}
        />
        <ModalBanBook
        isOpen={isModalOpen}
        onConfirm={banBook}
        BookTitle={bookBan?.title ||''}
        onClose={modalClose}
        banDesription={banDescription}
        setBanDescription={setBanDescription}
        />
         <SearchAuthorsBook
        search={search}
        setSearch={setSearch}
        searchQuery={searchQuery}
        scrollToElementUnBan = {scrollToElementUnBan}
        />
            {books.length > 0 ? (
                <div className="div_books_admin" ref={targetRef}>
                     
                
                                    <div className="books_author_admin" > 
                                  
                                        {books.map(book => (
                                            <div key={book._id} onMouseEnter={() => setHoveredBookId(book._id)} onMouseLeave={() => setHoveredBookId(null)} className="book_author">
                                                <div className="avatar-container">
                                                    <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview1' />
                                                    <Link to={`/book/${book._id}`}>
                                                        <div className="overlay1">  
                                                            {hoveredBookId === book._id && (
                                                                <div className="side-panel1">
                                                                    {book.isBanned ===true ? <button 
                                                                        className="confirm-button" 
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleUnBanClick(book);
                                                                        }}
                                                                    >
                                                                        Разбанить
                                                                    </button> :<button 
                                                                        className="confirm-button" 
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleBanClick(book);
                                                                        }}
                                                                    >
                                                                        Забанить
                                                                    </button>}
                                                                    <button 
                                                                        className="confirm-button" 
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleDeleteClick(book);
                                                                        }}
                                                                    >
                                                                        Удалить
                                                                    </button>
                                                                </div>
                                                            )}                            
                                                        </div>
                                                    </Link>
                                                </div> 
                                                <p className="p_title">{book.title}</p>
                                            </div> 
                                        ))}
                                    </div>
                                    </div>
                                ) : (
                                    <div className="div_none_book_admin">
                                        <h1 className="title_book_none">Книг пока нет</h1> 
                                    </div>
                                )}
                                <SearchBooks
                                    search={searchBook}
                                    setSearch={setSearchBook}
                                    searchQuery={searchQueryBook}
                                    scrollToElement={scrollToElement}
                                    />
                                {allowedBooks.length>0? (
                                     <div className="div_books_admin" ref={targetRefUnBan}>
                                    
                                    
                
                                     <div className="books_author_admin"> 
                                   
                                         {allowedBooks.map(book => (
                                             <div key={book._id} onMouseEnter={() => setHoveredBookId(book._id)} onMouseLeave={() => setHoveredBookId(null)} className="book_author">
                                                 <div className="avatar-container">
                                                     <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview1' />
                                                     <Link to={`/book/${book._id}`}>
                                                         <div className="overlay1">  
                                                             {hoveredBookId === book._id && (
                                                                 <div className="side-panel1">
                                                                     {book.isBanned ===true ? <button 
                                                                         className="confirm-button" 
                                                                         onClick={(e) => {
                                                                             e.preventDefault();
                                                                             handleUnBanClick(book);
                                                                         }}
                                                                     >
                                                                         Разбанить
                                                                     </button> :<button 
                                                                         className="confirm-button" 
                                                                         onClick={(e) => {
                                                                             e.preventDefault();
                                                                             handleBanClick(book);
                                                                         }}
                                                                     >
                                                                         Забанить
                                                                     </button>}
                                                                     <button 
                                                                         className="confirm-button" 
                                                                         onClick={(e) => {
                                                                             e.preventDefault();
                                                                             handleDeleteClick(book);
                                                                         }}
                                                                     >
                                                                         Удалить
                                                                     </button>
                                                                 </div>
                                                             )}                            
                                                         </div>
                                                     </Link>
                                                 </div> 
                                                 <p className="p_title">{book.title}</p>
                                             </div> 
                                         ))}
                                     </div>
                                     </div>
                                ):(
                                    <div className="div_none_book_admin">
                                    <h1 className="title_book_none">Книг пока нет</h1> 
                                </div>
                                )}
        </>
    );
}

export default BookGetControl;
