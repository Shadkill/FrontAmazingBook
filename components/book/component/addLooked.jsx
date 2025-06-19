import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const AddLooked = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState('Добавить в');
  const dropdownRef = useRef(null);

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleOptionClick = async (e, step) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/addBookLooked/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ step }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return toast.error(errorData.message);
      }
      const data = await response.json();
      toast.success(data.message);
      setSelectedPoint(e.target.textContent);
    } catch (error) {
      console.error(error);
    }
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const state = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookLooked/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          return toast.error(errorData.message);
        }
        const data = await response.json();
        setSelectedPoint(data);
      } catch (error) {
        console.error(error);
        toast.error('Ошибка при получении данных');
      }
    };

    setSelectedPoint('Добавить в'); // Сброс перед новым запросом
    document.addEventListener('mousedown', handleClickOutside);
    state();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id]); // Зависимость от id

  return (
    <div className="dropdawn" ref={dropdownRef}>
      <div className="block_filter_catalog1" onClick={toggleDropDown}>
        <img src="/image/filter_img.png" alt="" className="img_dropdawn1"/>
        <p className='dataList'>{selectedPoint}</p>
      </div>
      {isOpen && (
        <ul className="dropdown_menu">
          <form className='forms_looked'>
            <button className='button_drop' onClick={(e) => handleOptionClick(e, 1)}>Читаю</button>
          </form>
          <form className='forms_looked'>
            <button className='button_drop' onClick={(e) => handleOptionClick(e, 2)}>Прочитано</button>
          </form>
          <form className='forms_looked'>
            <button className='button_drop' onClick={(e) => handleOptionClick(e, 3)}>В планах</button>
          </form>
        </ul>
      )}
    </div>
  );
};

export default AddLooked;
