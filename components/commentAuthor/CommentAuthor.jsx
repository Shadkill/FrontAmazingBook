import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const CommentAuthor = () => {
    const navigate = useNavigate();
    const [author,setAuthor] = useState([]);
    const [comment,setComment] = useState('');
    const {id} = useParams();
    const handleBack = ()=>{
        navigate(-2);
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const payload = {
            comment
        }
        try {
            const loadingToast = toast.loading('Отправка данных...');
            const response = await fetch(`http://localhost:5000/api/commentAuthor/${id}`,{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-type':'application/json'
                },
                body: JSON.stringify(payload)
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message,{id:loadingToast});
                return;
            }
            const data =await response.json();
            toast.success(data.message,{id:loadingToast});
            navigate('/catalog');
        } catch (error) {
            console.error(error);
        }
    }
    const getAuthor = async()=>{
        try {    
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:5000/api/getAuthorByBook/${id}`,{
                method:'GET',
                headers:{
                     'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });
            if(!response.ok){
                const data = await response.json();
                toast.error(data.error || 'Ошибка при загрузке автора');
                return;            
            }
            const data = await response.json();
           
            setAuthor(data);

        } catch (error) {
            console.error(error);
            toast.error('Ошибка сети');
        }
    }
    useEffect(()=>{
       
        getAuthor();
    },[id]);
   
    return (
        <>
           <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                    <img src="/image/logo.png" alt="" className='logo'/>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
            </header>
            <BlockHeaderPrivacyMobile/>
            <div className="div_comment_author">
                <div className="div_text_comment_author">
                <h1 className='title_authors_comment'>Благодарим за прочтение данной книги!</h1>
                <p className='text_author_comment'>Автор {author?.pseudonym}, будет рад если вы оставите отзыв о его книге!</p>
                <form action="" onSubmit={handleSubmit}>
                    <div className="div_comment_authors">
                    <label htmlFor="" className='label_comment'>Ваш отзыв:</label>
                    <textarea name="" id="" className='textarea_author' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                   
                    </div>
                    <button className='button_page_auth2'>Отправить</button>
                    
                </form>
                <div className="div_link">
                <Link to={'/'} className='link_to_main'>Вернуться на главную</Link>
                </div>
                
                </div>
                
            </div>
        </>
    );
}

export default CommentAuthor;
