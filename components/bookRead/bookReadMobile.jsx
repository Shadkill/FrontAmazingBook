import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from '../model/ModelMobile';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import OrientationChecker from '../OrientationChecker/OrientationChecker';
import ChapterSelector from './ChapterSelector/ChapterSelector';
function BookReadMobile() {
    const { id } = useParams();
    const [animationAction, setAnimationAction] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [chapters, setChapters] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [isChapterVisible, setIsChapterVisible] = useState(true);
    const [isChapterVisible1, setIsChapterVisible1] = useState(true);
    const [currentContentIndex, setCurrentContentIndex] = useState(0); // Индекс для показа контента
    const maxSymbols = 525; // Максимальное количество символов на странице
    const navigate = useNavigate();
const getChapters = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bookRead/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    return toast.error(errorData.message);
                }

                const data = await response.json();
                setChapters(data);
                // Сбрасываем индексы при загрузке новых глав
                setCurrentContentIndex(0);
                setCurrentChapterIndex(0);
            } catch (error) {
                console.error(error);
                toast.error("Ошибка загрузки глав");
            }
        };
    useEffect(() => {
        

        getChapters();
    }, [id]);

    const handlePlayAnimation1 = () => {
        if (isButtonDisabled) return; // Если кнопка заблокирована, ничего не делаем

        // Проверяем, если текущий контент закончился
        if (currentContentIndex + maxSymbols < chapters[currentChapterIndex]?.content.length) {
            // Установка анимации для показа следующей части контента
            setAnimationAction('Plane.002Action');
            hideCurrentContentThenShowNext(currentContentIndex + maxSymbols);
        } else {
            // Если контент завершен, проверяем есть ли следующая глава
            if (currentChapterIndex < chapters.length - 1) {
                // Переход на следующую главу
                setCurrentChapterIndex(currentChapterIndex + 1);
                setCurrentContentIndex(0); // Сбрасываем индекс для следующей главы
                setAnimationAction('Plane.002Action'); // Установка анимации
                hideCurrentContentThenShowNext(0); // Показываем 0-ю часть следующей главы
            } else {
                // Если достигли конца всех глав, перенаправляем в каталог
                toast.success('Поздравляем с прочтением книги!')
                navigate(`/commentAuthor/${id}`);
                return;
            }
        }
    };

    const handlePlayAnimation2 = () => {
        if (isButtonDisabled) return; // Если кнопка заблокирована, ничего не делаем

        // Проверяем, если мы на первой главе и не можем вернуться
        if (currentChapterIndex <= 0 && currentContentIndex === 0) {
            return; // Ничего не делаем, если мы на первой главе
        }

        setAnimationAction('Plane.004Action'); // Установка анимации для показа предыдущей части
        hideCurrentContentThenShowPrev();
    };

    const hideCurrentContentThenShowNext = (newIndex) => {
        setIsChapterVisible1(false); // Скрываем главу
        setButtonDisabled(); // Блокируем кнопки
        setTimeout(() => {
            setCurrentContentIndex(newIndex); // Устанавливаем новый индекс контента
            setIsChapterVisible1(true); // Показываем новую часть главы
            setIsChapterVisible(false);
        }, 1000);
        // Установка таймаута для ожидания окончания анимации
        setTimeout(() => {
           
            setIsChapterVisible(true); // Показываем новую часть главы
        }, 2000); // Время анимации
    };

    const hideCurrentContentThenShowPrev = () => {
        setIsChapterVisible(false); // Скрываем главу
       
        setButtonDisabled(); // Блокируем кнопки
        setTimeout(() => {

            setIsChapterVisible(true); // Показываем новую часть главы
            setIsChapterVisible1(false);
        }, 1000);
        setTimeout(() => {
            // Если мы не можем вернуться на предыдущую главу
            if (currentContentIndex > 0) {
                setCurrentContentIndex(currentContentIndex - maxSymbols); // Показать предыдущую часть контента
            } else if (currentChapterIndex > 0) {
                setCurrentChapterIndex(currentChapterIndex - 1); // Переходим на предыдущую главу
                setCurrentContentIndex(chapters[currentChapterIndex - 1].content.length - (chapters[currentChapterIndex - 1].content.length % maxSymbols)); // Подсчитываем индекс
            }
            setIsChapterVisible1(true); // Показываем новую главу или часть
        }, 2000); // Время анимации
    };

    const setButtonDisabled = () => {
        setIsButtonDisabled(true);
        setTimeout(() => {
            setIsButtonDisabled(false);
            setAnimationAction(null); // Сбрасываем анимацию
        }, 2000); // Устанавливаем время, через которое кнопки разблокируются
    };
    const [imagePath,setImagePath] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [text,setText] = useState('');
    useEffect(() => {
        if (chapters.length > 0) {
            setTimeout(()=>{
                const newText = chapters[currentChapterIndex]?.content.slice(
                    currentContentIndex, 
                    currentContentIndex + maxSymbols
                );
                setText(newText);
                const imgPath = `http://localhost:5000/${chapters[currentChapterIndex].image.replace(/\\/g, '/')}`;
                setImagePath(imgPath);
                setChapterName(chapters[currentChapterIndex]?.title);
            },4000)
           
        }
    }, [currentChapterIndex, currentContentIndex, chapters,imagePath]);
    const handleChapterSelect = (chapterIndex,contentIndex)=>{
        setCurrentChapterIndex(chapterIndex);
        setCurrentContentIndex(contentIndex);
        const newText = chapters[chapterIndex]?.content.slice(
            contentIndex,
            contentIndex+maxSymbols
        );
        setText(newText);
        const imgPath = `http://localhost:5000/${chapters[chapterIndex].image.replace(/\\/g,'/')}`;
        setImagePath(imgPath);
        setChapterName(chapters[chapterIndex]?.title);
    }
    const handleBack = ()=>{
        navigate(-1);
    }
    return (
        <OrientationChecker>
        <div className='background_book'>

            <div className="div_buttons">
            <div className="div_handleBack">
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                </div>
                <div className="div_left_buttons_book" onClick={handlePlayAnimation2} disabled={isButtonDisabled}>
                    
                </div>
                <div className="div_left_buttons_book" onClick={handlePlayAnimation1} disabled={isButtonDisabled}>
                    
                </div>
                <ChapterSelector chapters={chapters} currentChapterIndex={currentChapterIndex} currentContentIndex={currentContentIndex} maxSymbols={maxSymbols} onSelect={handleChapterSelect}/>
               
               
            </div>

            <Canvas style={{ height: '100vh', width: '99vw', overflowX: 'hidden', overflowY: 'hidden' }}>
                <ambientLight intensity={2} />
                <Model animationAction={animationAction} text = {text} imagePath={imagePath} chapterName={chapterName} isChapterVisible={isChapterVisible} isChapterVisible1={isChapterVisible1} currentChapterIndex={currentChapterIndex} />
            </Canvas>
        </div>
        </OrientationChecker>
    )
}

export default BookReadMobile;
