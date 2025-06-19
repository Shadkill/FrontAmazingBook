import { useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';

const RegisterCode = () => {
    const [code,setCode] = useState('');
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');
    const login = localStorage.getItem('login');
    const confirmPassword = localStorage.getItem('confirmPassword');
    const name = localStorage.getItem('name');
    const age = localStorage.getItem('age');
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const payload = {
            code,
            email,
            password,
            age,
            name,
            confirmPassword,
            login
        };
        try {
            const response = await fetch('http://localhost:5000/api/user/addUser',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( payload )
            });
            if(!response.ok){
                const errorData = await response.json();
                toast.error(errorData.message);
                return;
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('confirmPassword');
            localStorage.removeItem('login');
            localStorage.removeItem('age');
            localStorage.removeItem('name');
            toast.success(data.message);
            navigate('/profile');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='gradient_div_auth'>
            <img src="/image/elipse_top_about.png" alt="" className='img_ellipse_privacy'/>
            <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                    <img src="/image/logo.png" alt="" className='logo'/>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
            </header>
            <BlockHeaderPrivacyMobile/>
            <div className="div_auth">
                <h1 className='title_auth'>Подтверждение почты</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div_inputs">
                        <input type="text" placeholder='Введите код с почты' value={code} onChange={(e)=>setCode(e.target.value)}/>
                    
                    </div>
                    <button type='submit' className='button_page_auth'>Отправить код</button>
                    
                    
                </form>
            </div>
        </div>
    );
}

export default RegisterCode;
