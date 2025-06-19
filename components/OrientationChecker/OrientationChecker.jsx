import { useState, useEffect } from 'react';
import './OrientationChecker.css';

const OrientationChecker = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia('(orientation: portrait)').matches
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange); // На случай, если orientationchange не сработает

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  if (isPortrait) {
    return (
      <div className="orientation-warning">
        <div className="orientation-message">
          <h2 className='h2_orientation'>Пожалуйста, переверните устройство</h2>
          <p className='p_orientation'>Для лучшего просмотра поверните телефон в горизонтальное положение</p>
          <div className="phone-icon">↻</div>
        </div>
      </div>
    );
  }

  return children;
};

export default OrientationChecker;