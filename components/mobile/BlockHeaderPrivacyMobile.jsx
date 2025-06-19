import { Link, useNavigate } from "react-router-dom";


const BlockHeaderPrivacyMobile = () => {
 const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };
    return (
        <div className="header_mobile_privacy">
            
                        <header className='header_privacy1'>
                            
                            <div className="div_title_header_privacy">
                                <Link to={'/'}><img src="/image/logo.png" alt="" className='logo'/></Link>
                                <p className='title_logo'>Потрясающая книга</p>
                            </div>
                            <img src="/image/arrow_mobile.png" alt="" className='arrow_privacy' onClick={handleBack}/>
                        </header>
        </div>
    );
}

export default BlockHeaderPrivacyMobile;
