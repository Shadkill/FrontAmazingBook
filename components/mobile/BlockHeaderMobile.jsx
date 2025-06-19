import React from 'react';
import { Link } from 'react-router-dom';
import HeaderMobile from './HeaderMobile';


const BlockHeaderMobile = () => {
    return (
        <>
        <div className="block_header_mobile">
        <HeaderMobile/>
        
            <div className="div_center">
                                           <Link to={'/'}> <img src="/image/logo.png" alt="" className='logo'/></Link>
                                            <p className='title_logo'>Потрясающая книга</p>
                                        </div>
                                        </div>
        </>
    );
}

export default BlockHeaderMobile;
