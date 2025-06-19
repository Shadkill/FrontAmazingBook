import React, { useEffect, useState } from 'react';
import './style.css';

const MobileRestriction = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем, является ли устройство мобильным
    const checkIfMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobile(isMobileDevice);
    };

    checkIfMobile();
    
    // Можно добавить обработчик изменения размера окна, если нужно
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="mobile-restriction-overlay">
      <div className="mobile-restriction-content">
        <h2>🚫 Страница недоступна на мобильных устройствах</h2>
        <p>Данный функционал предназначен только для использования на компьютерах.</p>
        <p>Пожалуйста, откройте эту страницу на десктопном устройстве.</p>
        <button 
          className="go-back-button"
          onClick={() => window.history.back()}
        >
          Вернуться назад
        </button>
      </div>
    </div>
  );
};

export default MobileRestriction;
