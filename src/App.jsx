
import './App.css'
import {Route,Routes} from 'react-router-dom';
import MainPage from '../components/mainpage/MainPage'
import Catalog from '../components/catalog/Catalog';
import Authors from '../components/authors/Authors';
import Registration from '../components/registration/RegistrationPage'
import Authorization from '../components/authorization/Authorization';
import PrivacyPolicy from '../components/privacyPolicy/PrivacyPolicy';
import UserAgreement from '../components/privacyPolicy/UserAgreement';
import ForAuthors from '../components/privacyPolicy/ForAuthors';
import ForReaders from '../components/privacyPolicy/ForReaders';
import UpdateAvatar from '../components/registration/UpdateAvatar';
import {Toaster} from 'react-hot-toast'
import ResetPassword from '../components/resetPassword/ResetPassword';
import CodeExamination from '../components/resetPassword/ExaminationCode';
import Profile from '../components/profile/Profile';

import AuthorCreate from '../components/authors/AuthorCreate';
import ProfileAuthor from '../components/profile/AuthorsProfile';
import BookCreate from '../components/book/BookCreatePage';
import AddGenre from '../components/admin/addGenre';
import BookPage from '../components/book/BookPage';
import AllNews from '../components/catalog/blocks_genres/AllNews';
import GenreBook from '../components/catalog/blocks_genres/GenreBook';
import BookRead from '../components/bookRead/BookRead';
import './mobile.css'
import ProtectedRoute from './middlewear';
import AuthCode from '../components/authorization/AuthCode';
import RegisterCode from '../components/registration/RegisterCode';
import AuthorUpdateBook from '../components/authorControl/AuthorUpdateBook';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import AdminPanel from '../components/admin/AdminPanel';
import UserControl from '../components/admin/UserControl';
import BookControl from '../components/admin/BookControl';
import CommentAuthor from '../components/commentAuthor/CommentAuthor';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {


  return (
    <>
    <ScrollToTop />
      <Routes>
      
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/catalog" element={<Catalog />} />
        <Route exact path="/authors" element={<Authors />} />
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/authorization" element={< Authorization/>} />
        <Route exact path="/userAgreement" element={< UserAgreement/>} />
        <Route exact path="/privacyPolicy" element={< PrivacyPolicy/>} />
        <Route exact path="/forAuthors" element={< ForAuthors/>} />
        <Route exact path="/forReaders" element={< ForReaders/>} />
        < Route exact path="/updateProfile" element={<ProtectedRoute><UpdateAvatar/></ProtectedRoute>}/>
        <Route exact path="/resetPassword" element={<ResetPassword/>}/>
        <Route exact path="/codeExamination" element={<CodeExamination/>}/>
        <Route exact path="/profile" element={
          <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
          }/>
        <Route exact path='/authorCreate' element={<ProtectedRoute> <AuthorCreate/></ProtectedRoute>}/>
        <Route exact path='/authors/:login' element={ <ProfileAuthor/> }/>
        <Route exact path= '/bookCreate' element = {<ProtectedRoute roles={['author']}><BookCreate/></ProtectedRoute>}/>
        <Route exact path='/genreControl' element={ <ProtectedRoute roles={['admin']}><AddGenre/></ProtectedRoute> }/>
        <Route exact path='/book/:id' element={<ProtectedRoute><BookPage/></ProtectedRoute>}/>
        <Route exact path='/catalog/allNews' element={<AllNews/>}/>
        <Route exact path='/catalog/:id' element={<GenreBook/>}/>
        <Route exact path='/bookRead/:id' element={<BookRead/>}/>
        <Route exact path='/authCode' element={<AuthCode/>}/>
        <Route exact path='/registerCode' element={<RegisterCode/>}/>
        <Route exact path='/bookUpdate/:id' element={<ProtectedRoute roles={['author']}><AuthorUpdateBook/></ProtectedRoute>}/>
        <Route exact path='/commentAuthor/:id' element={<ProtectedRoute><CommentAuthor/></ProtectedRoute>}/>
        <Route exact path='/admin' element={<ProtectedRoute roles={['admin']}><AdminPanel/></ProtectedRoute>}/>
        <Route exact path='/userControl' element={<ProtectedRoute roles={['admin']}><UserControl/></ProtectedRoute>}/>
        <Route exact path='/bookControl' element={<ProtectedRoute roles={['admin']}><BookControl/></ProtectedRoute>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
