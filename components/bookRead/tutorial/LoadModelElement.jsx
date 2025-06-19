import React, { useState, useEffect } from 'react';

const LoadModelElement = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // Исчезнет через 3 секунды

    return () => clearTimeout(timer); // Очистка таймера при размонтировании
  }, []);

  if (!isVisible) return null; // Не рендерим компонент, если isVisible === false

  return (
    <div className='tutorial_block'>
        <div className="div_block_load_text">
        <h1>Подождите...</h1>
        </div>
      
    </div>
  );
};

export default LoadModelElement;
