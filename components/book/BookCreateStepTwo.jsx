import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './style.css'
const BookCreateStepTwo = ({ bookId }) => {
    const [chapters, setChapters] = useState([{ title: '', content: '', image: null }]);
    const navigate = useNavigate();
    const handleAddChapter = () => {
        setChapters([...chapters, { title: '', content: '', image: null }]);  // Добавляем новую главу
    };

    const handleChapterChange = (index, event) => {
        const newChapters = [...chapters];
        newChapters[index][event.target.name] = event.target.value;
        setChapters(newChapters);
    };

    const handleFileChange = (index) => (event) => {
        const file = event.target.files[0];
        const newChapters = [...chapters];
        newChapters[index].image = file;
        setChapters(newChapters);
    };

    const handleSubmitChapters = async (event) => {
        event.preventDefault();

        for (let chapter of chapters) {
            const formData = new FormData();
            formData.append('title', chapter.title);
            formData.append('content', chapter.content);

            if (chapter.image) {
                formData.append('image', chapter.image);
            }

            const response = await fetch(`http://localhost:5000/api/books/${bookId}/chapters`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        }

        toast.success('Глава(ы) успешно добавлены!');
        navigate('/profile');
    };

    return (
        <>
        <div className="block_title_step2">
            <h1>Шаг 2</h1>
            <p className='p_title_chapters'>Создание глав</p>
        </div>
        
       
        <form onSubmit={handleSubmitChapters}>
            
            

            
            {chapters.map((chapter, index) => (
                <div key={index} className="div_inputs_book_add">
                    <div className="div_title_block_add_chapter">
                        <h1>Глава {index+1}</h1>
                    <input
                        type="text"
                        name='title'
                        placeholder='Название главы'
                        value={chapter.title}
                        onChange={(e) => handleChapterChange(index, e)}
                        required
                    />
                    </div>
                    
                    <div className="div_book_add_form">
                        <div className="div_block_left_book">

                        
                    {chapter.image ? (
                        <div>
                            <p style={{fontSize: '1.2vw'}}>Вы загрузили изображение для главы:</p>
                            <div className='avatar-container'>
                            <img src={URL.createObjectURL(chapter.image)} alt="Превью изображения" className='img_preview1'/>
                            </div>
                        </div>
                    ) : (
                        <div className='img_div_add'>
                            <p className='p_add_img'>Выберите изображение для главы.</p>
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
                        value={chapter.content}
                        onChange={(e) => handleChapterChange(index, e)}
                        required
                        className='content_chapter'
                    />
                    </div>
                    </div>
                    
                </div>
            ))}
            <div className="div_buttons_add_chapter">
            <button type="button" onClick={handleAddChapter} className='button_add_chapter'>Добавить главу</button>
            <button type="submit" className='button_add_chapter'>Сохранить главы</button>
            </div>
            
            
        </form>
        </>
    );
};

export default BookCreateStepTwo;