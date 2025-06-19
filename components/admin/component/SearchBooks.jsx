import React, { useRef } from 'react';

const SearchBooks = ({search,setSearch,searchQuery, scrollToElement}) => {
   
       return (
           <>
           
           <div className='searchBook'>
               <h1>Книги</h1>
                <input type="text" placeholder='Введите название книги' value={search} onChange={searchQuery}/>
                
           </div>
           <div className="div_butto">
               <button className='button_anchor' onClick={scrollToElement}>Перейти к заблокированным книгам</button>
               </div>
           </>
       );
}

export default SearchBooks;
