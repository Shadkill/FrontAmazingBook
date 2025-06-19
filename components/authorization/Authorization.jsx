import  { useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const Authorization = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true); // Включаем загрузку
        
        const loadingToast = toast.loading('Отправка данных...');
        const payload = {
            email,
            password
        }
        try {
            const response = await fetch('http://localhost:5000/api/user/loginCode',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            if(!response.ok){
                const errorData = await response.json();
                toast.error(errorData.message, {id:loadingToast});
                setIsLoading(false);
                return;
            }
            const data = await response.json();
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            toast.success(data.message, { id: loadingToast });
            navigate('/authCode');
        } catch (error) {
            console.error(error);   
            setIsLoading(false);
        }finally {
            setIsLoading(false); // Выключаем загрузку в любом случае
        }
    }
    return (
        <div className='gradient_div_auth'>
            <img src="/image/elipse_top_about.png" alt="" className='img_ellipse_privacy'/>
            <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                    <Link to={'/'}><img src="/image/logo.png" alt="" className='logo'/></Link>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
            </header>
            <BlockHeaderPrivacyMobile/>
            <div className="div_auth">
                <h1 className='title_auth'>Авторизация</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div_inputs">
                        <input type="text" placeholder='Почта' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder='Пароль' className='input_password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <Link to={'/resetPassword'} >Забыли пароль?</Link>
                    </div>
                    <button type='submit' className='button_page_auth' disabled={isLoading}>Войти</button>
                    <div className="div_link">
                        <Link to={'/registration'} className='link_registration'>Ещё не зарегистрированы?</Link>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default Authorization;
