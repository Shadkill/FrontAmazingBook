import { useEffect, useState } from 'react';
import './style.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Footer from '../footer/Footer';
import LoadingScreen from "../catalog/LoadingScreen";
const AuthorUpdateBook = () => {
    const [chapters, setChapters] = useState([]);
    const [book, setBook] = useState(null);
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState('');
    const [genreId, setGenreId] = useState('');
    const [year_released, setYearReleased] = useState('');
    const [title, setTitle] = useState('');
    const [preview, setPreview] = useState(null);
    const [music, setMusic] = useState(null);
    const [music1, setMusic1] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [description,setDescription] = useState('');
    const [loading,setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const {id} = useParams();
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);
    useEffect(() => {
        const loadResources = async () => {
           
            setTimeout(() => {
                setLoading(false);
            }, 400); 
        };

        loadResources();
    }, []);
    const handleAddChapter = () => {
        setChapters([...chapters, { title: '', content: '', image: null }]);
    };

    const handleRemoveChapter = async(index) => {
        if (chapters.length <= 1) {
            toast.error('Должна остаться хотя бы одна глава');
            return;
        }
        const newChapters = [...chapters];
        newChapters.splice(index, 1);
        setChapters(newChapters);
        try {
            const response = await fetch(`http://localhost:5000/api/deleteChapter/${index}`,{
                method: 'DELETE',
                'Content-type':'application/json'
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message);
                return;
            }
            const data = await response.json();
            toast.success(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChapterChange = (index, event) => {
        const newChapters = [...chapters];
        newChapters[index][event.target.name] = event.target.value;
        setChapters(newChapters);
    };

    const handleFileChange = (index) => (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const newChapters = [...chapters];
        newChapters[index].image = file;
        setChapters(newChapters);
    };

    const GetBook = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookRead/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const data = await response.json();
                toast.error(data.message);
                return;
            }
            
            const data = await response.json();
            setChapters(data);
        } catch (error) {
            console.error(error);
            toast.error('Ошибка загрузки глав книги');
        }
    };

    const getBookTitle = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/book_detail/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const data = await response.json();
                toast.error(data.message);
                return;
            }
            
            const data = await response.json();
            setBook(data.book);
            setTitle(data.book.title);
            setMusic1(data.book.music);
            setGenre(data.genre);
            setDescription(data.book.description)
            setYearReleased(data.book.year_released);
            setGenreId(data.genre.id);
        } catch (error) {
            console.error(error);
            toast.error('Ошибка загрузки информации о книге');
        }
    };

    const GetGenres = async () => {
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
        } catch (error) {
            console.error('Ошибка получения жанров:', error);
            toast.error('Ошибка загрузки жанров');
        }
    };

    const handleUpdateBook = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Обновление основной информации о книге
            const bookFormData = new FormData();
            bookFormData.append('title', title);
            bookFormData.append('year_released', year_released);
            bookFormData.append('genreId', genreId);
            bookFormData.append('description', description);
            if (preview) bookFormData.append('preview', preview);
            if (music) bookFormData.append('music', music);
            
            const bookResponse = await fetch(`http://localhost:5000/api/bookUpdate/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: bookFormData
            });
            
            if (!bookResponse.ok) {
                const errorData = await bookResponse.json();
                throw new Error(errorData.message);
            }
            for (const chapter of chapters) {
                if (!chapter.image) {
                    throw new Error('Изображение каждой главы обязательно для загрузки.');
                }
            }
            // Обновление глав
            const chaptersFormData = new FormData();
        
            // Добавляем главы как JSON строку
            const chaptersData = chapters.map(chapter => ({
                title: chapter.title,
                content: chapter.content,
                image: chapter.image instanceof File ? undefined : chapter.image // Не отправляем File, только пути
            }));
            chaptersFormData.append('chapters', JSON.stringify(chaptersData));
            
            // Добавляем файлы изображений с правильными именами
            chapters.forEach((chapter, index) => {
                if (chapter.image instanceof File) {
                    chaptersFormData.append(`image_${index}`, chapter.image);
                }
            });
            
            const chaptersResponse = await fetch(`http://localhost:5000/api/chaptersUpdate/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,

                },
                body: chaptersFormData
            });
            
            if (!chaptersResponse.ok) {
                const errorData = await chaptersResponse.json();
                throw new Error(errorData.message);
            }
            
            toast.success('Книга успешно обновлена');
            navigate(-1);
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Ошибка при обновлении книги');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBookTitle();
        GetBook();
        GetGenres();
    }, []);

    return (
        loading? <LoadingScreen/> :
        <>
            <img src="/image/elipse_top_about.png" alt="" className='img_ellipse_privacy'/>
            <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                    <Link to={'/'}><img src="/image/logo.png" alt="" className='logo'/></Link>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
            </header>
            
            <div className='div_main_update_book'>
                <form onSubmit={handleUpdateBook} className='form_update'>
                <h1>Редактирование книги</h1>
                    <div className="div_inputs_block_update">
                    <p className='title_book_create'>Внесите изменения:</p>
                    
                    <div className="div_block_title_update">
                        <label>Название книги</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label className='text_add_book'>Описание книги</label>
                        <textarea  placeholder='Краткое описание' maxLength={500} value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                        <label>Год выпуска</label>
                        <input 
                            type="text" 
                            value={year_released} 
                            onChange={(e) => setYearReleased(e.target.value)}
                            required
                        />
                        
                        {book?.preview && (
                            <div className="div_container_image_and_input">
                                <div className="avatar-container">
                                    <img
                                        src={
                                            preview 
                                                ? URL.createObjectURL(preview)
                                                : `http://localhost:5000/${book.preview}`
                                        }
                                        alt="Обложка книги"
                                        className="img_preview1"
                                    />
                                </div>
                                <p className="p_add_img">Выберите новое изображение для обложки</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPreview(e.target.files[0])}
                                />
                            </div>
                        )}
                        
                        <label className='text_add_book'>Жанр:</label>
                        <select 
                            onChange={(e) => setGenreId(e.target.value)} 
                            value={genreId} 
                            required
                            className='select_genre'
                        >
                            {genres.map((genre) => (
                                <option key={genre._id} value={genre._id}>
                                    {genre.genre}
                                </option>
                            ))}
                        </select>
                        
                        <label className='text_add_book'>Музыка:</label>
                        <audio 
                            src={music ? URL.createObjectURL(music) : `http://localhost:5000/${music1}`} 
                            controls
                        />
                        <input 
                            type="file" 
                            accept='audio/*' 
                            onChange={(e) => setMusic(e.target.files[0])}  
                        />
                    </div>
                    </div>
                    <div className="div_chapters_update">
                    <h1>Редактирование глав</h1>
                    {chapters.map((chapter, index) => (
                        <div key={index} className="div_inputs_book_add">
                            <div className="div_title_block_add_chapter">
                                <h1>Глава {index+1}</h1>
                                
                            </div>
                            
                            <div className="div_title_block_add_chapter">
                                <input
                                    type="text"
                                    name='title'
                                    placeholder='Название главы'
                                    value={chapter.title || ''}
                                    onChange={(e) => handleChapterChange(index, e)}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="button_add_chapter"
                                    onClick={() => handleRemoveChapter(index)}
                                    title="Удалить главу"
                                    
                                >
                                    Удалить главу
                                </button>
                            </div>
                            
                            <div className="div_book_add_form">
                                <div className="div_block_left_book">
                                    {chapter.image ? (
                                        <div className="div_container_image_and_input">
                                            <div className="avatar-container">
                                                <img
                                                    src={
                                                        chapter.image instanceof File
                                                            ? URL.createObjectURL(chapter.image)
                                                            : `http://localhost:5000/${chapter.image}`
                                                    }
                                                    alt="Превью главы"
                                                    className="img_preview1"
                                                />
                                            </div>
                                            <p className="p_add_img">Выберите изображение для главы</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange(index)}
                                            />
                                        </div>
                                    ) : (
                                        <div className="img_div_add">
                                            <p className="p_add_img">Выберите изображение для главы</p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange(index)}
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="div_block_left_book">
                                    <textarea
                                        name="content"
                                        placeholder='Содержание главы'
                                        value={chapter.content || ''}
                                        onChange={(e) => handleChapterChange(index, e)}
                                        required
                                        className='content_chapter'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                   
                    <div className="div_buttons_add_chapter">
                        <button 
                            type="button" 
                            onClick={handleAddChapter} 
                            className='button_add_chapter'
                            disabled={isLoading}
                        >
                            Добавить главу
                        </button> 
                        
                        <button 
                            type="submit" 
                            className='button_add_chapter'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
                        </button>
                    </div>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    );
}

export default AuthorUpdateBook;