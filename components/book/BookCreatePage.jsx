
import './style.css';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BookCreatePageMain from './BookCreatePageMain';
import Footer from '../footer/Footer'
const BookCreatePage = () => {
   const navigate = useNavigate();
   
       const handleBack = () => {
           navigate(-1); // Возвращает на предыдущую страницу
       };
    return (
        <div>
             <Header/>
                        
            <div className="book_create">
                <div className="block_title_book_create">
                     <h1>Добавление книги</h1>
                <img src="/image/arrow_book_create.png" alt="" className='arrow_book_create' onClick={handleBack}/>
                </div>
                <p className='title_book_create'>Давайте добавим вашу новую книгу:</p>               
            </div>
            <div className="book_create">
                <BookCreatePageMain/>
            </div>
          
        <Footer/>
        </div>
    );
}

export default BookCreatePage;
