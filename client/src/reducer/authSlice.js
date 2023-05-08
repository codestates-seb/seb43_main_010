import { createSlice } from '@reduxjs/toolkit';

//30분 타임아웃
const TOKEN_TIMEOUT = 1800 * 1000;

const initialState = {
  authenticated: false,
  accessToken: null,
  expireTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIMEOUT;
    },
    removeToken(state) {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});
export const { setToken, removeToken } = authSlice.actions;
export default authSlice.reducer;
