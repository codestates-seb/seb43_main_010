import { configureStore } from '@reduxjs/toolkit';
import signupSlice from '../reducer/signupSlice';
import authSlice from '../reducer/authSlice';
const store = configureStore({
  reducer: {
    signup: signupSlice,
    auth: authSlice,
  },
});

export default store;
