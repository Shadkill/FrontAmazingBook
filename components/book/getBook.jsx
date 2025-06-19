import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import './style.css'
import AddLooked from "./component/addLooked";

const GetBook = ({bookBan,setBookBan}) => {
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [author, setAuthor] = useState([]);
    const [genre, setGenre] = useState([]);
    const [yearReleased, setYearReleased] = useState([]);
    useEffect(()=>{
        const getBookPage = async ()=>{
            try {
                const response = await fetch(`http://localhost:5000/api/book_detail/${id}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok){
                    const errorData = await response.json();
                    return toast.error(errorData);
                }
                const data = await response.json();
                setBook(data.book);
                setAuthor(data.author);
                setGenre(data.genre);
                setYearReleased(data.book.year_released);
                setBookBan(data.book.isBanned);
            } catch (error) {
                console.log(error);
            }
        }
        getBookPage();
    },[id]);
    return (
        <>

                
                <h1 className="title_book_page">{book.title}</h1>
                <div className="div_block_book_info">
                    <div className="div_dates">

                    
                <div className="div_button_read">
                    <div className="avatar-container">
                       
                <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview'/></div>
                <Link to={`/bookRead/${id}`}><button className="button_read">Читать</button></Link>
                </div>
                <div className="div_data_info_book">
                <p className="data_book_p">Автор: {author.name}</p>
                <p className="data_book_p">Жанр: {genre.genre}</p>
                <p className="data_book_p">Год выпуска: {yearReleased}</p>
                <AddLooked bookId = {book.id}/>
                </div>
                </div>
                <div className="div_description">
                    <p className="data_book_p1">Описание:</p>
                    <p className="data_book_p2">{book.description}</p>
                </div>
                
                    </div>                
                      
                   
                       
        </>
    );
}

export default GetBook;
