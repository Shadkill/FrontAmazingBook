import  { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Header from '../header/Header';
import './style.css'
import ModalDeleteGenre from './component/ModalDeleteGenre';
import Footer from '../footer/Footer';

const AddGenre = () => {
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [genreUpdate,setGenreUpdate] = useState('');
    const [genreUpdateVisible, setGenreUpdateVisible] = useState(false);
    const [genreIdUpdate, setGenreIdUpdate]= useState(null);
    const [genreIdDelete, setGenreIdDelete]= useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState(null);
    const handleDeleteClick = async (genreName,genreId)=>{
        setGenreToDelete(genreName);
        setGenreIdDelete(genreId);
        setIsModalOpen(true);
        
    }
    const handleDeleteConfirm = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/api/deleteGenre/${genreIdDelete}`,{
                method:'DELETE',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message);
                return;
            }
            const data = await response.json();
            toast.success(data.message);
            await getGenres();
        } catch (error) {
            console.error(error);
        }finally {
            setIsModalOpen(false);
            setGenreToDelete(null);
        }
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setGenreToDelete(null);
        setGenreIdDelete(null);
    };
    const handleUpdateClick = (GenreName, genreId)=>{
        setGenreUpdate(GenreName);
        setGenreIdUpdate(genreId);
        setGenreUpdateVisible(true);
    }
    const handleCancelUpdate = ()=>{
        setGenreUpdate('');
        setGenreIdUpdate(null);
        setGenreUpdateVisible(false);
    }
    const getGenres = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getAllGenres', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message);
                return;
            }
            
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error('Ошибка при загрузке жанров:', error);
            toast.error('Ошибка при загрузке жанров');
        }
    };
    useEffect(()=>{

        
       getGenres();
    },[]);
    const handleUpdateGenre = async(e)=>{
    e.preventDefault();
    const payload ={
        genre:genreUpdate
    }
    try {
        const response = await fetch(`http://localhost:5000/api/updateGenre/${genreIdUpdate}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
        });
        if(!response.ok){
            const data = await response.json();
            toast.error(data.message);
            return;
        }
        const data = await response.json();
        toast.success(data.message);
        setGenreUpdate('');
        setGenreIdUpdate(null);
        setGenreUpdateVisible(false);
        await getGenres();

    } catch (error) {
        console.error(error);
    }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            genre
        }
        try {
            const response = await fetch('http://localhost:5000/api/addGenre',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify( payload )
            });
            if(!response.ok){
                const errorData = await response.json();
                toast.error(errorData.message);
                return;
            }
            const data = await response.json();
            toast.success(data.message);
            setGenre('');
            await getGenres();
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
        <Header/>
        <ModalDeleteGenre
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDeleteConfirm}
        genreName={genreToDelete||''}
        />
        <div className="div_main_add_genre">
        <form action="" onSubmit={handleSubmit}>
            
            <div className="div_form_add_genre">
                <h1>Добавление жанра</h1>
                <label htmlFor="genre">Название жанра:</label>
                <input type="text" id="genre" name="genre" required value={genre} onChange={(e)=> setGenre(e.target.value)}/>
                <button type="submit" className='button_page_admin'>Добавить жанр</button>
                </div>
            </form>
            <div className="div_genres">
            <h1>Управление жанрами</h1>
           <div className="div_genres_list">

           
            {
                genres.length > 0 &&
                <ul>
                    {genres.map(genre => (
                        
                        <div className="div_item_genre" key={genre._id}> 
                        
                        {genreIdUpdate === genre._id && genreUpdateVisible ?<div className="div_block_genre">
                            <form action="" onSubmit={handleUpdateGenre}>
                           <div className="div_genre_update_input">
                           <li ><input type="text" value={genreUpdate} onChange={(e)=> setGenreUpdate(e.target.value)} /></li>
                           <div className="div_buttons_update">
                           <button type='submit' className='button_update'>Обновить</button>
                           <button onClick={()=>handleCancelUpdate()} className='button_update'>Отмена</button>
                           </div>
                            
                           </div>
                             </form>
                        </div>: <div className="div_block_genre">
                        <li >{genre.genre}</li>
                        <div className="div_buttons_update"> 
                             <button 
                                className="panel-button" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUpdateClick(genre.genre, genre._id);
                                }}
                                >
                                    <img src="/image/icon_update.png" alt="" className="icon_author"/>
                                </button>
                             <button 
                                className="panel-button" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteClick(genre.genre,genre._id);
                                }}
                                >
                                    <img src="/image/icon_delete.png" alt="" className="icon_author"/>
                                </button>
                                </div>
                        </div>}
                       
                            
                                                        
                        </div>
                       
                    ))}
                </ul>
            } 
            </div>
            </div>
        </div>
           <Footer/>
        </>
    );
}

export default AddGenre;
