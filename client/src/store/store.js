import { configureStore } from '@reduxjs/toolkit';
import signupSlice from '../reducer/signupSlice';
import authSlice from '../reducer/authSlice';
import userSlice from '../reducer/userSlice';
const store = configureStore({
  reducer: {
    signup: signupSlice,
    auth: authSlice,
    currentUser: userSlice,
  },
});

export default store;
