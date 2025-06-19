import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import { useState } from 'react';
import toast from 'react-hot-toast';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile'
const AuthorCreate = () => {
    const navigate = useNavigate();
    const [pseudonym, setPseudonym]= useState('');
    const [bio, setBio] = useState('');
    const [name,setName] = useState('');
    const token = localStorage.getItem("token");
    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const payload = {
            pseudonym,
            bio,
            name
        }
        try {
            const response = await fetch('http://localhost:5000/api/authorCreate',{
                method: 'PUT',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            if(!response.ok){
                const errorData =await response.json();
                toast.error(errorData);
            }
            toast.success('Вы успешно стали автором!');
            localStorage.removeItem('token');
            navigate('/profile'); 
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='gradient_div_authe'>
            <img src="/image/elipse_top_about.png" alt="" className='img_ellipse_privacy'/>
            <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                    <img src="/image/logo.png" alt="" className='logo'/>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
            </header>
            <BlockHeaderPrivacyMobile/>
            <div className="div_auth1">
                <h1 className='title_auth'>Стать автором</h1>
                <p className="create_author_p">Для того чтобы стать автором вы должны заполнить некоторые новые поля.</p>
                <form onSubmit={handleSubmit}>
                    <div className="div_inputs">
                        <input type="text" placeholder='Укажите ФИО' required value={name} onChange={(e)=> setName(e.target.value)}/>
                        <input type="text" placeholder='Укажите свой псевдоним' required value={pseudonym} onChange={(e)=> setPseudonym(e.target.value)}/>
                        <textarea type="text" placeholder='Расскажите о себе' required value={bio} onChange={(e)=>setBio(e.target.value)}/>
                        
                        <div className="div_submit">
                        <input type="checkbox" required className='check'/>
                        <p className='p_reg'>Я согласен с информацией на странице <br /> <Link to={'/forAuthors'}>Для авторов</Link></p>
                        <p className='p_reg_m'>Я согласен с информацией на странице  <Link to={'/forAuthors'}>Для авторов</Link></p>
                        
                    </div>
                    </div>
                    <button type='submit' className='button_page_auth'>Стать автором</button>
                    
                    
                </form>
            </div>
        </div>
        </>
    );
}

export default AuthorCreate;
