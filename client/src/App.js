import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';
import FeedPage from './pages/FeedPage';
import ArtistPage from './pages/ArtistPage';
import MusicPage from './pages/MusicPage';
import ProfilePage from './pages/ProfilePage';
//임시 페이지
import TempPage from './pages/tempPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/artist' element={<ArtistPage />} />
        <Route path='/music' element={<MusicPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        {/* 테스트 하고 멘토링 후 삭제 하겠습니다. */}
        <Route path='/' element={<TempPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
