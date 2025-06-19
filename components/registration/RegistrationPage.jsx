
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './style.css'
import toast from 'react-hot-toast';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const RegistrationPage = () => {
    const navigate = useNavigate();
    
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [login,setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age,setAge]= useState('');
    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    
    
     
      const handleSubmit = async(e)=>{
        e.preventDefault();
        const loadingToast = toast.loading('Отправка данных...');
        const payload = {
            name,
            email,
            login,
            password,
            confirmPassword,
            age,
        }
        try {
            const response = await fetch('http://localhost:5000/api/user/addUserCode',{
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload),
            })
            if(!response.ok){
                const errorData = await response.json();
                toast.error(errorData.message, {id:loadingToast});
                return;
            }
            const data = await response.json();
            localStorage.setItem('name',name);
            localStorage.setItem('email',email);
            localStorage.setItem('login',login);
            localStorage.setItem('password', password);
            localStorage.setItem('confirmPassword', confirmPassword);
            localStorage.setItem('age', age);
            toast.success(data.message,{id:loadingToast});
            navigate('/registerCode');
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <div className='gradient_div_register'>
            <img src="/image/elipse_top_about.png" alt="" className='img_ellipse_privacy'/>
            <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                   <Link to={'/'}> <img src="/image/logo.png" alt="" className='logo'/></Link>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
                
            </header>
            <BlockHeaderPrivacyMobile/>
            <div className="div_auth1">
                <h1 className='title_auth'>Регистрация</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div_inputs">
                        <input type="text" placeholder='Введите ваше имя' value={name} onChange={(e)=> setName(e.target.value)}/>
                        <div className="div_date_container">
                            <label htmlFor="">Укажите ваш возраст:</label>
                        <input type="date" placeholder='Введите ваш возраст' value={age} onChange={(e)=> setAge(e.target.value)}/>  
                        </div>
                        <input type="text" placeholder='Введите логин' value={login} onChange={(e)=> setLogin(e.target.value)}/>
                        <input type='email' placeholder='Введите вашу электронную почту' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                       
                    <input type="password" placeholder='Пароль' className='input_password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <input type="password" placeholder='Повторите пароль' className='input_password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
                    <div className="div_submit">
                        <input type="checkbox" required className='check'/>
                        <div className="div_polz">
                        <p className='p_reg'>Нажимая Зарегистрироваться, вы соглашаетесь с <br /> <Link to={'/privacyPolicy'}>Условиями пользования</Link></p>
                        </div>
                        <div className="div_rights_polz">
                        <p className='p_reg'>Нажимая Зарегистрироваться, вы соглашаетесь с  <Link to={'/privacyPolicy'}>Условиями пользования</Link></p>
                        <p className='p_reg_m'>Нажимая Зарегистрироваться, вы соглашаетесь с  <Link to={'/privacyPolicy'}>Условиями пользования</Link></p>
                        </div>
                    </div>
                    
                    </div>
                    <button type='submit' className='button_page_auth'>Зарегистрироваться </button>
                    <div className="div_link">
                        <Link to={'/authorization'} className='link_registration' >Уже есть аккаунт?</Link>
                    </div>
                    
                </form>
            </div>
            
        </div>
    );
}

export default RegistrationPage;
