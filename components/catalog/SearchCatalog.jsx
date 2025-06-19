import { useState } from "react";
import DropDawn from "./DropDawn";

const SearchCatalog = ({ onSearchTermChange}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Вызываем функцию изменения термина поиска
        onSearchTermChange(value);
    };
    
    return (
        <div>
              <div className="div_top_block_authors">
                                <h1 className='title_authors_page'>Каталог</h1>
                                <div className="div_inputs_block_catalog">
                                
                                
                                <div className="div_search">
                                
                                <form action="" className="div_search_in" onSubmit={(e) => e.preventDefault()}>
                                <button type='submit' className='search_but'>
                                        <img src="/image/search_icon.png" alt="" className='search_img'/>
                                    </button>
                                    <input type="text" placeholder='Поиск' className='search_input1' value={searchTerm} onChange={handleSearchChange}/>
                                    </form>
                                </div>
                               <DropDawn/>
                               </div>
                            </div>
        </div>
    );
}

export default SearchCatalog;
