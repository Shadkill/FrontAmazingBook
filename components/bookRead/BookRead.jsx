import React, { useState, useEffect } from 'react';
import BookReadDesktop from './bookReadDesktop';
import BookReadMobile from './bookReadMobile';
import LoadingScreenBookRead from './LoadingScreenBookRead/LoadingScreenBookRead';

const BookRead = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        // Функция для проверки ширины экрана
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 1024); // 768px - обычная граница между мобильными и десктопными устройствами
        };

        // Проверяем при монтировании компонента
        checkScreenSize();

        // Добавляем слушатель изменения размера окна
        window.addEventListener('resize', checkScreenSize);

        // Убираем слушатель при размонтировании компонента
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    useEffect(() => {
        const loadResources = async () => {
            setTimeout(() => {
                setLoading(false);
            }, 10000);
        };
        loadResources();
    }, []);
    return (
        <>
        {loading?<LoadingScreenBookRead/>:(
            <div>
            {isMobile ? <BookReadMobile /> : <BookReadDesktop />}
            
        </div>
        )}
        </>
    );
};

export default BookRead;