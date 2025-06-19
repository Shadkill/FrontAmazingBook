
import { Link } from 'react-router-dom';
import Header from '../../header/Header';
import GetBookByGenre from './getBookByGenre';
import Footer from '../../footer/Footer';
import FooterMobile from '../../mobile/FooterMobile';

import BlockHeaderMobile from '../../mobile/BlockHeaderMobile';

const GenreBook = () => {
    return (
        <>
            <Header/>
            <BlockHeaderMobile/>
                                    <div className="div_block_catalog">

                                    

            <GetBookByGenre/>
            </div>
            <Footer/>
            <FooterMobile/>
        </>
    );
}

export default GenreBook;
