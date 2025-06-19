import { useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const ResetPassword = () => {
    const [email,setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading('Отправка данных...');
        const payload = {
            email
        }
        
        try {
            const response = await fetch('http://localhost:5000/api/sendEmail/sendCode',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })
            if(!response.ok){
                const errorData = await response.json();
                toast.error(errorData.message,{id:loadingToast});
                navigate('/resetPassword');
                isLoading(false);
                return;
            }else{
                localStorage.setItem('email', email);
                toast.success('Код отправлен на вашу почту!',{id:loadingToast});
            navigate('/codeExamination')
            return;
            }
            
        } catch (error) {
            console.log(error);
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
                <h1 className='title_auth'>Изменение пароля</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div_inputs">
                        <input type="text" placeholder='Введите почту от акканта' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    
                    </div>
                    <button type='submit' className='button_page_auth'>Отправить код</button>
                    
                    
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

