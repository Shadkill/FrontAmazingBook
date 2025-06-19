
import './style.css';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import   { useEffect,useState,useCallback  } from 'react';
 import NewsCatalog from './blocks_genres/NewsCatalog';
import SearchCatalog from './SearchCatalog';
import AllGenres from './blocks_genres/AllGenres';
import Footer from'../footer/Footer';
import debounce from 'lodash.debounce';
import LoadingScreen from './LoadingScreen';

import BlockHeaderMobile from '../mobile/BlockHeaderMobile';
import FooterMobile from '../mobile/FooterMobile';


const Catalog = () => {

    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(false);
    
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedHandleSearch = useCallback(
        debounce(async (term) => {
            if (term.trim() === '') {
                setSearchResults([]);
                return;
            }
            setLoading1(true);
            try {
                const response = await fetch(`http://localhost:5000/api/searchBooks?query=${term}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.books);
                } else {
                    const errorData = await response.json();
                    console.error(errorData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading1(false);
            }
        }, 300), // Задержка в 300 мс
        []
    );
    const handleClear = () => {
        setSearchResults([]);
        setSearchTerm('');
    };

    const handleSearchTermChange = (term) => {
        setSearchTerm(term);
        debouncedHandleSearch(term);
    };

    useEffect(() => {
        const loadResources = async () => {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };
        loadResources();
    }, []);
    return (
        <>
        {loading ? <LoadingScreen /> : (
        <div className='parent'>
            <Header/>
            <BlockHeaderMobile/>
            
                        <img src="/image/elipse_back_block_four.png" alt="" className="ellipse_back_profile"/>
                        <div className="div_block_catalog">
                            
                        <SearchCatalog onSearchTermChange={handleSearchTermChange} />
                        
                        {loading1 ? <div style={{minHeight:'35vw'}}></div> : (
                            searchResults.length > 0 ? (
                                <div className="div_news">
                                    <p className='title_catalog'>Результаты поиска</p>
                                    <div className='block_news'>
                                        {searchResults.map(book => (
                                            <div className="div_book" key={book._id}>
                                                <div className="avatar-container">
                                                    <img src={`http://localhost:5000/${book.preview}`} alt="" className='img_preview' />
                                                    <Link to={`/book/${book._id}`}>
                                                        <div className="overlay" />
                                                    </Link>
                                                </div>
                                                <p className="p_title">{book.title.length > 22 ? `${book.title.slice(0, 20)}...` : book.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : searchTerm.trim() !== '' ? (
                                <div className="div_search_items">

                                
                                <div className="div_none_book">
                                    <h1 className='none_h'>Нет результатов по вашему запросу</h1>
                                </div>
                                </div>
                            ) : null
                        )}
                            <div className="div_news">
                            <p className='title_catalog'>Новинки</p>
                            
                            <NewsCatalog/>
                            
                            </div>
                            
                            <AllGenres/>
                            
                            </div>
                            <Footer/>
                            <FooterMobile/>
        </div>
        )}
        </>
    );
}

export default Catalog;
