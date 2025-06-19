import { useState,useEffect, useRef } from "react";
import './style.css'
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const DropDawn = ({ onGenreChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGenre,setSelectedGenre] = useState('Каталог');
    const [genres, setGenres] = useState([]);
    const token = localStorage.getItem('token');
    const dropdownRef = useRef(null);
    const {id} =useParams();
    
    useEffect(() => {
        const addGenres = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/getAllGenres', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.message);
                    return;
                }

                const data = await response.json();
                setGenres(data);
                if (id) {
                    const foundGenre = data.find(genre => genre._id === id);
                    if (foundGenre) {
                        setSelectedGenre(foundGenre.genre);
                    }
                }
            } catch (error) {
                console.error('Ошибка получения жанров:', error);
            }
        };

        addGenres();
    }, [token,id]);
    const toggleDropDown = ()=>{
        setIsOpen(!isOpen);
    }
    const handleOptionClick = (genre)=>{
        setSelectedGenre(genre);
        setIsOpen(false);
        
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Добавляем слушатель события
        document.addEventListener('mousedown', handleClickOutside);
        
        // Удаляем слушатель при размонтировании компонента
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
   
    return (
        <div className="dropdawn" ref={dropdownRef}>
            <div className="block_filter_catalog" onClick={toggleDropDown}>
                                <img src="/image/filter_img.png" alt="" className="img_dropdawn"/>
                                <p className="dropdown_item">{selectedGenre.length > 10 ? `${selectedGenre.slice(0, 10)}...` : selectedGenre}</p>
                                
                               </div>
                               {isOpen && (
                                <ul className="dropdown_menu">
                                    <Link to={`/catalog`} className="a_dropdown_item">
                                            <li className="dropdown_item">
                                           Каталог
                                        </li>
                                        </Link>
                                    {genres.map((genre,index)=>(
                                        <Link to={`/catalog/${genre._id}`} key={index} className="a_dropdown_item">
                                            <li key={index} onClick={()=>handleOptionClick(genre.genre)} className="dropdown_item">
                                            {genre.genre}
                                        </li>
                                        </Link>
                                        
                                    ))}
                                </ul>
                               )}
        </div>
    );
}

export default DropDawn;
