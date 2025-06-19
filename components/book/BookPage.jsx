
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";

import GetBook from "./getBook";
import BookAuthors from "./BookAuthors";

import Footer from "../footer/Footer";
import './style.css'
import LoadingScreen from "../catalog/LoadingScreen";
import { useEffect, useState } from "react";
import FooterMobile from "../mobile/FooterMobile";
import BlockHeaderMobile from "../mobile/BlockHeaderMobile";
const BookPage = () => {
    const [loading, setLoading] = useState(true);
    const [bookBan,setBookBan] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const loadResources = async () => {
           
            setTimeout(() => {
                setLoading(false);
            }, 500); 
        };

        loadResources();
    }, []);
    const handleBack = ()=>{
    navigate(-1);
    }
    return (
        <>
        
        {loading ? <LoadingScreen /> : (
        <>
        <Header />
            <BlockHeaderMobile/>
        {bookBan===true ? <div className="book_ban">
            <img src="/image/Not_found_bella.png" alt="" className="bella_ban"/>
            <p className="handleBack_ban" onClick={handleBack}>Вернуться назад</p>
            <h1>Данная книга заблокирована</h1>
            </div>:<div>
           
                        <img src="/image/elipse_back_block_four.png" alt="" className="ellipse_back_profile"/>
            <div className="block_book_page">
            <GetBook bookBan ={bookBan} setBookBan ={setBookBan}/>
            
            </div>
            
       <div className="div_book_author">

                            
            <BookAuthors />
            </div>
            
           </div>}
            <Footer/>
           <FooterMobile/>
        </>
        )}
        </>
    );
}

export default BookPage;
