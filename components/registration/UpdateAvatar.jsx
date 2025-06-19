

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'
import toast from 'react-hot-toast';
import BlockHeaderPrivacyMobile from '../mobile/BlockHeaderPrivacyMobile';
const UpdateAvatar = () => {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null); // Сохраняем только файл, а не URL
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const [roleUser,setRoleUser] = useState('');
    const [name,setName] = useState('');
    const [login,setLogin] = useState('');
    const [age,setAge] = useState('');
    const [bio,setBio] = useState('');
    const [pseudonym,setPseudonym] = useState('');
    const [avatarUser,setAvatarUser] = useState('');
    const handleBack = () => {
             navigate(-1); // Возвращает на предыдущую страницу
          };
    // Функция для обработки перетаскивания или выбора файла
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]; // Берём первый файл
        if(file){
           setAvatar(file); // Сохраняем сам файл 
        }
        
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });
    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const response = await fetch('http://localhost:5000/api/userInfo',{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok){
                    const errorData = await response.json();
                    toast.error(errorData);
                }
                const data = await response.json();
                setRoleUser(data.role);
                setAge(data.age);
                if(data.role == 'author'){
                setBio(data.bio);
                setPseudonym(data.pseudonym); 
                }
                setLogin(data.login);
                setName(data.name);
                setAvatarUser(data.avatar);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
        },[token])
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('avatar', avatar); // Добавляем файл в FormData
        formData.append('name',name);
        formData.append('login',login);
        formData.append('age',age);
        if(roleUser=='author'){
            formData.append('pseudonym',pseudonym);
            formData.append('bio',bio);
        }


        try {
            const response = await fetch('http://localhost:5000/api/userUpdateProfile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    // Удаляем 'Content-Type', чтобы браузер сам выставил правильный
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                toast.error(errorData.message || 'Ошибка при обновлении аватара');
                return; // Прервать выполнение, если произошла ошибка
            }

            const data = await response.json();
            toast.success(data.message);
            navigate('/profile');
        } catch (error) {
            console.log(error);
            toast.error('Произошла ошибка при обновлении аватара');
        }
    };

    return (
        <div className='gradient_div_register1'>
            <img src="/image/elipse_top_about.png" alt="" className='img_ellipse_privacy'/>
            <header className='header_privacy'>
                <img src="/image/arrow_top_about.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                <div className="div_title_header_privacy">
                    <img src="/image/logo.png" alt="" className='logo'/>
                    <p className='title_logo'>Потрясающая книга</p>
                </div>
            </header>
            <BlockHeaderPrivacyMobile/>
            <div className="div_auth3">
                <h1 className='title_auth'>Обновление данных</h1>
                <form onSubmit={handleSubmit}>
                    <div className="div_inputs1">
                        <label htmlFor="" className='label_avatar'>Вставьте фото профиля</label>
                        {avatarUser ? (
                        <div style={{display:'flex', gap:'5vw'}}>
                        <div className='div_photo'>
                            <div className='block_avatar_update'  style={{
                                overflow: 'hidden', // Обрезка для изображения
                                position: 'relative',
                                borderTopLeftRadius: '30vw', borderTopRightRadius: '30vw'
                            }}>
                            <img src={avatar?URL.createObjectURL(avatar):`http://localhost:5000/${avatarUser}`} alt="Preview"className='img_avatar_update' style={{
                                        position: 'absolute', // Позиционируем изображение
                                        top: '50%', // Для центрирования
                                        left: '50%', // Для центрирования
                                        
                                        transform: 'translate(-50%, -50%)', // Центруем изображение
                                        objectFit: 'cover', // Обрезаем изображение
                                    }}/>

                            </div>
                            
                            </div>
                            <div {...getRootProps({ className: 'dropzone1' })} style={{
                                        border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                            <input {...getInputProps()} accept='image/*' />
                            <p className='p_img'>Перетащите изображение сюда или кликните для выбора файла.</p>
                            </div>
                        </div>
                        
                    ) : (
                        <div {...getRootProps({ className: 'dropzone1' })} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
                            <input {...getInputProps()} accept='image/*' required />
                            <p className='p_img'>Перетащите изображение сюда или кликните для выбора файла.</p>
                        </div>
                    )}
                    <div className="div_input_update_profile">
                        <label htmlFor="" className='label_avatar'>Имя:</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="div_input_update_profile">
                        <label htmlFor="" className='label_avatar'>Логин:</label>
                    <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)}/>
                    </div>
                    <div className="div_input_update_profile">
                        <label htmlFor="" className='label_avatar'>Дата рождения:</label>
                    <input type="date" value={age} onChange={(e)=>setAge(e.target.value)}/>
                    </div>
                    
                    {roleUser == 'author'?<div className="div_input_update_profile">
                        <div className="div_input_update_profile">
                        <label htmlFor="" className='label_avatar'>Псевдоним:</label>
                    <input type="text" value={pseudonym} onChange={(e)=>setPseudonym(e.target.value)}/>
                    </div>
                    <div className="div_input_update_profile">
                        <label htmlFor="" className='label_avatar'>Обо мне:</label>
                    <textarea type="text" value={bio} onChange={(e)=>setBio(e.target.value)} className='textarea_bio'/>
                    </div>
                    </div>: <div></div>}
                    <button type='submit' className='button_page_auth2'>Сохрaнить</button>
                    </div>

                    
                </form>
            </div>
            
        </div>
    );
}

export default UpdateAvatar;