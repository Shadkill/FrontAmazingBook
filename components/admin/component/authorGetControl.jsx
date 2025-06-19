import React from 'react';
import  { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ModalBanUser from './ModalBanUser';
import ModalUnBanUser from './ModalUnBanUser';
const AuthorGetControl = () => {
    const [authors,setAuthors] = useState([]);
       const [search,setSearch] = useState('');
       const [userName,setUserName] = useState('');
       const [isModalOpen,setIsModalOpen] = useState(false);
       const [banDescription,setBanDescription] = useState('');
       const [userId,setUserId] = useState(null);
    const[isModalOpenUnBan, setIsModalOpenUnBan] = useState(false);
    const getUsers = async(query='')=>{
            try {
                const response = await fetch(`http://localhost:5000/api/getAuthorAdmin?query=${query}`,{
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                    
                });
                if(!response.ok){
                    const data = await response.json();
                    toast.error(data.error);
                    return;
                }
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error(error);
            }
        }
    useEffect(()=>{
        
        getUsers();
    },[]);
    const handleBanConfirm = async()=>{
        const payload = {
            banDescription
        }
        try {
            const loadingToast = toast.loading('Отправка данных...');
            const response = await fetch(`http://localhost:5000/api/banUser/${userId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                    
                },
                body:JSON.stringify(payload)
            })
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message,{id:loadingToast});
                return;
            }
            const data = await response.json();
            toast.success(data.message,{id:loadingToast});
            setBanDescription('');
            setUserId(null);
            setUserName(null);
            setIsModalOpen(false);
            await getUsers();
        } catch (error) {
            console.error(error);
        }

    }
    const handleClickBan = (userName,id)=>{
        setUserName(userName);
        setUserId(id);
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setUserName('');
        setBanDescription('');
    };
    const handleSearch = (e)=>{
        const value = e.target.value;
        setSearch(value);
        getUsers(value);
    }
    const handleModalUnBanClose = ()=>{
        setIsModalOpenUnBan(false);
        setUserName('');
        setUserId(null);
    }
    const handleUnBanClick = (userName, id)=>{
        setIsModalOpenUnBan(true);
        setUserName(userName);
        setUserId(id);
    }
    const handleUnBanConfirm = async()=>{

        try {
            const loadingToast = toast.loading('Отправка данных...');
            const response = await fetch(`http://localhost:5000/api/unBanUser/${userId}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                    
                }
            })
            if(!response.ok){
                const data = await response.json();
                toast.error(data.message,{id:loadingToast});
                return;
            }
            const data = await response.json();
            toast.success(data.message,{id:loadingToast});
            setUserId(null);
            setUserName(null);
            setIsModalOpenUnBan(false);
            await getUsers();
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <>
        <ModalBanUser
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleBanConfirm}
        userName={userName||''}
        banDesription = {banDescription}
        setBanDescription={setBanDescription}
        />
        <ModalUnBanUser
        isOpen={isModalOpenUnBan}
        onClose={handleModalUnBanClose}
        onConfirm={handleUnBanConfirm}
        userName={userName||''}
        />
        <div className="div_users_block">
        <h1>Авторы</h1>
        
        <input type="text" placeholder='Введите логин или имя' value={search} onChange={handleSearch}/>
                <div className="div_users_list">
                {authors.length>0? authors.map(user=>(
                    <div className="div_user_block_user_control" key={user._id}>
                        <p className='user_name'>{user.name}</p>
                        <p className='user_name'>{user.login}</p>
                        {user.isBanned===true?<button className="confirm-button" onClick={(e)=> {e.preventDefault(); handleUnBanClick(user.name, user._id) }}>Разбанить</button>:<button className="confirm-button" onClick={ (e) => {e.preventDefault(); handleClickBan(user.name,user._id); }}>Забанить</button>}
                    </div>
                )): <div className='div_none_user'><p className='user_none'>Пользователи не найдены</p></div>}
                </div>
               
    </div>
    </>
    );
}

export default AuthorGetControl;
