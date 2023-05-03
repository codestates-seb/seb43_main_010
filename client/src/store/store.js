import { configureStore } from '@reduxjs/toolkit';
import signupSlice from '../reducer/signupSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
  },
});

export default store;
