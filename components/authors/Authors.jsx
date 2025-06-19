
import './style.css';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingScreen from '../catalog/LoadingScreen';
import BlockHeaderMobile from '../mobile/BlockHeaderMobile';
import FooterMobile from '../mobile/FooterMobile';
import Footer from '../footer/Footer';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuthors();
        const loadResources = async () => {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };
        loadResources();
    }, []);

    const fetchAuthors = async (query = '') => {
        try {
            const response = await fetch(`http://localhost:5000/api/getAuthors?query=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
            }

            const data = await response.json();
            setAuthors(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        fetchAuthors(value); // Вызываем поиск с каждым изменением в поле ввода
    };

    return (
        <>
            {loading ? <LoadingScreen /> : (
                <div className='gradient_author_page'>
                    <Header />
                    <BlockHeaderMobile/>
                    
                    <img src="/image/ellipse_back_block_author.png" alt="" className='ellipse_back_block_author' />
                    <div className="block_authors_page">
                        <div className="div_top_block_authors">
                            <h1 className='title_authors_page'>Авторы</h1>
                            <div className="div_search">
                                <input type="text" 
                                       placeholder='Найти автора' 
                                       className='search_input' 
                                       value={search} 
                                       onChange={handleSearch} /> 
                                       <button className='search_but'>
                                        <img src="/image/search_icon.png" alt="" className='search_img'/>
                                    </button>
                            </div>
                            
                        </div>
                        <div className="div_authors">
                            {authors.length > 0 ? (
                                authors.map((author, i) => (
                                    <div className="div_author" key={author._id}>
                                        {i % 2 !== 0 ? (
                                            <div className="div_author_block">
                                                <p className='author_name'>{author.name.length > 17 ? `${author.name.slice(0, 14)}...` : author.name}</p>
                                                <div className="avatar-container2">
                                                    <img src={author?.avatar ? `http://localhost:5000/${author.avatar}` : './image/avatar.jpg'} alt="" className='avatar_author' />
                                                    <Link to={`/authors/${author.login}`}><div className="photo-frame1"></div></Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="div_author_block1">
                                                <div className="avatar-container2">
                                                    <img src={author?.avatar ? `http://localhost:5000/${author.avatar}` : './image/avatar.jpg'} alt="" className='avatar_author_2' />
                                                    <Link to={`/authors/${author.login}`}><div className="photo-frame"></div></Link>
                                                </div>
                                                <p className='author_name'>{author.name.length > 17 ? `${author.name.slice(0, 17)}...` : author.name}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="no_results">Нет результатов</p> // Сообщение о том, что авторов не найдено
                            )}
                        </div>
                    </div>
                </div>
            )}
            <FooterMobile/>
            <Footer/>
        </>
    );
};

export default Authors;
