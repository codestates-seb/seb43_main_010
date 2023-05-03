import { createSlice } from '@reduxjs/toolkit';

// 왜 userSlice 안했냐면 signup시에 일반유저와 아티스트의 구분을 위해서
// 기능에 따른 리듀서 이름으로 정하느라 그랬어요
const initialState = {
  fan: { email: '', pwd: '', pwdCheck: '', name: '', nickname: '' },
  artist: { email: '', pwd: '', pwdCheck: '', name: '', nickname: '', group: '' },
};

const signupSlice = createSlice({
  name: 'signup',
  initialState: initialState,
  reducers: {
    setFan(state, action) {
      state.fan = action.payload;
      console.log(state.fan);
    },
    setArtist(state, action) {
      state.artist = action.payload;
      console.log(state.artist);
    },
    resetInputs(state) {
      Object.assign(state, initialState);
      console.log(state.fan);
      console.log(state.artist);
    },
  },
});
export const { setFan, setArtist, resetInputs } = signupSlice.actions;
export default signupSlice.reducer;
