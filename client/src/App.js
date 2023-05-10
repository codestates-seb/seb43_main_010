import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';
import FeedPage from './pages/FeedPage';
import MusicPage from './pages/MusicPage';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
import JoinPage from './pages/JoinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/join/:groupId' element={<JoinPage />} />
        <Route path='/feed/:groupId' element={<FeedPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/music/:groupId' element={<MusicPage />} />
        <Route path='/profile/:groupId' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
