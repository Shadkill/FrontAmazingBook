import React, { useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const ExaminationCode = () => {
    const [code,setCode] = useState('');
    const  [newPassword,setNewPassword] = useState('');
    const [repeatNewPassword,setRepeatNewPassword] = useState('');
   const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading('Отправка данных...')
        const payload = {
            email,
            newPassword,
            code,
            repeatNewPassword
        }
        try {
            const response = await fetch('http://localhost:5000/api/resetPassword/resetPassword',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })
            if(!response.ok){
                const errorData = await response.json();
                toast.error(errorData.message, {id:loadingToast});
                setIsLoading(false);
                return;
            }else{
                const successData = await response.json();
                toast.success(successData.message,{id:loadingToast});
                localStorage.removeItem('email');
            navigate('/authorization');
            return;
            }
            
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
                <h1 className='title_auth'>Введите данные</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div_inputs">
                        <input type="text" placeholder='Введите код с почты' value={code} onChange={(e)=>setCode(e.target.value)}/>
                        <input type="password" placeholder='Введите новый пароль' className='input_password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        <input type="password" placeholder='Повторите пароль' className='input_password' value={repeatNewPassword} onChange={(e)=>setRepeatNewPassword(e.target.value)}/>
                        
                    
                    </div>
                    <button type='submit' className='button_page_auth'>Изменить пароль</button>
                    
                    
                </form>
            </div>
        </div>
    );
};

export default ExaminationCode;

