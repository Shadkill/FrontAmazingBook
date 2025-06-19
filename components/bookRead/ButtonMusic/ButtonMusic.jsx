import React, { useState, useRef, useEffect } from 'react';
import { FaMusic, FaPause } from 'react-icons/fa';
import styles from './ButtonMusic.module.css';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ButtonMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.1); // Уменьшил начальную громкость до 10%
    const audioRef = useRef(null);
    const [music, setMusic] = useState('');
    const { id } = useParams();

    // Устанавливаем громкость при каждом изменении music или volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [music, volume]); // Добавил music в зависимости

    const togglePlay = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Гарантируем, что громкость установлена перед воспроизведением
            audioRef.current.volume = volume;
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Autoplay was prevented:", error);
                    toast.error("Нажмите на страницу перед воспроизведением музыки");
                });
            }
        }
        setIsPlaying(!isPlaying);
    };

    const getBookPage = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/book_detail/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || "Ошибка загрузки книги");
                return;
            }
            
            const data = await response.json();
            setMusic(data.book.music);
        } catch (error) {
            console.error("Ошибка:", error);
            toast.error("Ошибка сети");
        }
    };

    useEffect(() => { 
        if (id) {
            getBookPage();
        }
    }, [id]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);
        
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [music]); // Добавил music в зависимости

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
    };

    if (!music) return null;

    return (
        <div className={styles.container}>
            <audio 
                ref={audioRef} 
                loop 
                src={`http://localhost:5000/${music}`}
                controls={false}
                preload="auto"
            />
            
            <button
                onClick={togglePlay}
                className={`${styles.button} ${
                    isPlaying ? styles.buttonPlaying : styles.buttonStopped
                }`}
                aria-label={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
            >
                <span className={styles.icon}>
                    {isPlaying ? <FaPause size={18} /> : <FaMusic size={18} />}
                </span>
                <span className={styles.text}>
                    {isPlaying ? 'Пауза' : 'Включить музыку'}
                </span>
                <span className={styles.hoverEffect}></span>
            </button>
            
            <div className={styles.volumeControl}>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    aria-label="Регулятор громкости"
                />
            </div>
        </div>
    );
};

export default ButtonMusic;