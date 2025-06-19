import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "../catalog/LoadingScreen";
import toast from "react-hot-toast";
import ModalDelete from "./component/ModalDelete";

const GetBookAuthor = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredBookId, setHoveredBookId] = useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const token = localStorage.getItem('token');
    const [loadTost,setLoadToast] = useState(false);
    const handleDeleteClick = async (book)=>{
        setBookToDelete(book);
        setIsModalOpen(true);
        
    }
    const handleDeleteConfirm = async(e)=>{
        e.preventDefault();
        const loadingToast = toast.loading('Отправка данных...');
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
                toast.error(data.message,{id:loadingToast});
                return;
            }
            const data = await response.json();
            toast.success(data.message,{id:loadingToast});
            setBooks(books.filter(book => book._id !== bookToDelete._id));
        } catch (error) {
            console.error(error);
        }finally {
            setIsModalOpen(false);
            setBookToDelete(null);
        }
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setBookToDelete(null);
    };
    useEffect(()=>{
        const AddBooks = async()=>{
            try {
                const response = await fetch('http://localhost:5000/api/myBook',{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok){
                    const errorData = await response.json();
                    return console.log(errorData.message);
                    
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error(error);
            }
        }
        AddBooks();
        const loadResources = async () => {
           
            setTimeout(() => {
                setLoading(false);
            }, 500); 
        };

        loadResources();
    },[token])
    return (
        <>
            {loading ? <LoadingScreen /> : (
                <>
                    <ModalDelete
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        onConfirm={handleDeleteConfirm}
                        bookTitle={bookToDelete?.title || ""}
                    />
                    
                    {books.length > 0 ? (
                        <div className="books_author"> 
                            {books.map(book => (
                                <div key={book._id} onMouseEnter={() => setHoveredBookId(book._id)} onMouseLeave={() => setHoveredBookId(null)} className="book_author">
                                    <div className="avatar-container">
                                        <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview1' />
                                        <Link to={`/book/${book._id}`}>
                                            <div className="overlay1">  
                                                {hoveredBookId === book._id && (
                                                    <div className="side-panel">
                                                        <Link to={`/bookUpdate/${book._id}`}>
                                                            <button className="panel-button">
                                                                <img src="/image/icon_update.png" alt="" className="icon_author"/>
                                                            </button>
                                                        </Link>
                                                        <button 
                                                            className="panel-button" 
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDeleteClick(book);
                                                            }}
                                                        >
                                                            <img src="/image/icon_delete.png" alt="" className="icon_author"/>
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
                    ) : (
                        <div className="div_none_book">
                            <h1 className="title_book_none">Вы пока не написали ни одной книги</h1> 
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default GetBookAuthor;
