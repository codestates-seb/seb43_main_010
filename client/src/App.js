import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';
import FeedPage from './pages/FeedPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        {/* <Route path='/feed' element={<FeedPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
