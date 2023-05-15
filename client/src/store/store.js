import { configureStore } from '@reduxjs/toolkit';
import signupSlice from '../reducer/signupSlice';
import authSlice from '../reducer/authSlice';
import userSlice from '../reducer/userSlice';
import colorSlice from '../reducer/colorSlice';
const store = configureStore({
  reducer: {
    signup: signupSlice,
    auth: authSlice,
    currentUser: userSlice,
    color: colorSlice,
  },
});

export default store;
