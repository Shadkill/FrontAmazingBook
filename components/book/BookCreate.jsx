import './style.css';
import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const BookCreate = ({ onNext }) => {
    const token = localStorage.getItem('token');
    const [preview, setPreview] = useState(null);
    const [title, setTitle] = useState('');
    const [genreId, setGenreId] = useState(''); // Храним ID выбранного жанра
    const [genres, setGenres] = useState([]); // Переименовано для ясности
    const [music, setMusic] = useState(null);
    const [description, setDescription] = useState('');
    const [year_released, setYear_released] = useState('');
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setPreview(file);
        console.log('обложка',file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на наличие обязательных полей
        if (!preview) {
            toast.error('Обложка книги обязательна.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('preview', preview);
        formData.append('genre', genreId); // Передаем ID жанра
        formData.append('description',description);
        formData.append('year_released', year_released);
        if (music) {
            formData.append('music', music);
        }

        try {
            const response = await fetch('http://localhost:5000/api/bookCreate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
            } else {
                onNext(data._id);
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги:', error);
        }
    };

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
            } catch (error) {
                console.error('Ошибка получения жанров:', error);
            }
        };

        addGenres();
    }, [token]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="div_inputs_book_add">
                    <label className='text_add_book'>Загрузите обложку книги:</label>
                    {preview ? (
                        <div style={{display:'flex', gap:'5vw'}}>
                        <div className='div_photo'>
                            <div  style={{
                                width: '15vw', // Ширина блока
                                height: '25vw', // Высота блока
                                overflow: 'hidden', // Обрезка для изображения
                                position: 'relative',
                                borderTopLeftRadius: '30vw', borderTopRightRadius: '30vw'
                            }}>
                            <img src={URL.createObjectURL(preview)} alt="Preview"style={{
                                        position: 'absolute', // Позиционируем изображение
                                        top: '50%', // Для центрирования
                                        left: '50%', // Для центрирования
                                        width: '18vw', // Автоширина сохраняет пропорции
                                        height: '25vw', // Занимает всю высоту блока
                                        transform: 'translate(-50%, -50%)', // Центруем изображение
                                        objectFit: 'cover', // Обрезаем изображение
                                    }}/>
                            <p>Вы загрузили обложку книги.</p>
                            </div>
                            
                            </div>
                            <div {...getRootProps({ className: 'dropzone1' })} style={{
                                        border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                            <input {...getInputProps()} accept='image/*' />
                            <p className='p_img'>Перетащите изображение сюда или кликните для выбора файла.</p>
                            </div>
                        </div>
                        
                    ) : (
                        <div {...getRootProps({ className: 'dropzone1' })} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                            <input {...getInputProps()} accept='image/*' required />
                            <p className='p_img'>Перетащите изображение сюда или кликните для выбора файла.</p>
                        </div>
                    )}

                    <label className='text_add_book'>Введите название книги</label>
                    <input type="text" placeholder='Название книги' required value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label className='text_add_book'>Год выпуска:</label>
                    <input type="text" placeholder='Год выпуска' required value={year_released} onChange={(e) => setYear_released(e.target.value)} />
                    <label className='text_add_book'>Выберите жанр:</label>
                    <select onChange={(e) => setGenreId(e.target.value)} value={genreId} required className='select_genre'>
                        <option value="" disabled>Выберите жанр</option>
                        {genres.map((genre) => (
                            <option key={genre._id} value={genre._id}>{genre.genre}</option>
                        ))}
                    </select>
                    <label className='text_add_book'>Расскажите о чём ваша книга</label>
                    <textarea  placeholder='Краткое описание' maxLength={500} value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
                    <label className='text_add_book'>Выберите музыку для заднего фона</label>
                    <input type="file" accept='audio/*' onChange={(e) => setMusic(e.target.files[0])} required />
                </div>

                <button type='submit' className='button_page_auth'>Приступить ко 2 шагу</button>
            </form>
        </div>
    );
}

export default BookCreate;
