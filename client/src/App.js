import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import KaKaoLogin from './components/Login/LoginMaterial/KaKaoLoginPage';
import SignupPage from './pages/Signup';
import JoinPage from './pages/JoinPage';
import MusicPage from './pages/MusicPage';
import FeedPage from './pages/FeedPage';
import ArtistPage from './pages/ArtistPage';
import ProfilePage from './pages/ProfilePage';
import IntroductionPage from './pages/IntroductionPage';

function App() {
  useEffect(() => {
    // console.log(dbService);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauth/callback/kakao' element={<KaKaoLogin />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/join/:groupId' element={<JoinPage />} />
        <Route path='/music/:groupId' element={<MusicPage />} />
        <Route path='/feed/:groupId' element={<FeedPage />} />
        <Route path='/artist/:groupId' element={<ArtistPage />} />
        <Route path='/music' element={<MusicPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/artist' element={<ArtistPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/introduction' element={<IntroductionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
