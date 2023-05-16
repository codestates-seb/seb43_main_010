import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import KaKaoLogin from './components/Login/LoginMaterial/KaKaoLoginPage';
import SignupPage from './pages/Signup';
import FeedPage from './pages/FeedPage';
import ArtistPage from './pages/ArtistPage';
import MusicPage from './pages/MusicPage';
import ProfilePage from './pages/ProfilePage';
import MainPage from './pages/MainPage';
import JoinPage from './pages/JoinPage';
import MyProfilePage from './pages/MyProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/join/:groupId' element={<JoinPage />} />
        <Route path='/feed/:groupId' element={<FeedPage />} />
        <Route path='/artist/:groupId' element={<ArtistPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth/callback/kakao' element={<KaKaoLogin />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/artist' element={<ArtistPage />} />
        <Route path='/music' element={<MusicPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/music/:groupId' element={<MusicPage />} />
        <Route path='/myprofile/:groupId' element={<MyProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
