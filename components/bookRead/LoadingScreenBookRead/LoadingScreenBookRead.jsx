import { useState, useEffect } from 'react';
import './Loading.css';

const LoadingScreenBookRead = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Создаём звёзды
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'starBookRead';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      document.querySelector('.star-containerBookRead').appendChild(star);
    };

    for (let i = 0; i < 50; i++) createStar();

    // Имитация прогресса (в реальном проекте замените на реальный прогресс загрузки)
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 80); // Скорость обновления (мс)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screenBookRead">
      <img src="/image/read_bell.png" alt="" className='read_bell'/>
      <div className="star-containerBookRead"></div>
      
      <div className="progress-containerBookRead">
        {/* Круговой индикатор */}
        
         
          
        <div className="linear-progressBookRead">
          <div 
            className="progress-barBookRead" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-textBookRead">
           <p className='p_progress'>{progress}%</p> 
            </div>
      </div>

    </div>
  );
};

export default LoadingScreenBookRead;