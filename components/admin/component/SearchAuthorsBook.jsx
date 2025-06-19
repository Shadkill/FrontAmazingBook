import React, { useRef } from 'react';

const SearchAuthorsBook = ({search,searchQuery,scrollToElementUnBan}) => {
  
    return (
        <>
        
        <div className='searchBook'>
            <h1>Заблокированные книги</h1>
             <input type="text" placeholder='Введите название книги' value={search} onChange={searchQuery}/>
             
        </div>
        <div className="div_butto">
            <button className='button_anchor' onClick={scrollToElementUnBan}>Перейти к незаблокированным книгам</button>
            </div>
        </>
    );
}

export default SearchAuthorsBook;
