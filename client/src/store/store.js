import { configureStore } from '@reduxjs/toolkit';
import signupSlice from '../reducer/signupSlice';
import authSlice from '../reducer/authSlice';
import colorSlice from '../reducer/colorSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
    auth: authSlice,
    color: colorSlice,
  },
});

export default store;
