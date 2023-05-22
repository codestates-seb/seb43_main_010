import { createSlice } from '@reduxjs/toolkit';
import defaultProfile from '../assets/jpg-file/profile-img.jpg';
// 왜 userSlice 안했냐면 signup시에 일반유저와 아티스트의 구분을 위해서
// 기능에 따른 리듀서 이름으로 정하느라 그랬어요
const initialState = {
  calssification: false,
  fan: { email: '', password: '', passwordCheck: '', name: '', nickname: '', profile: defaultProfile },
  artist: {
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    nickname: '',
    profile: defaultProfile,
    group: '',
    groupProfile: defaultProfile,
  },
};
const signupSlice = createSlice({
  name: 'signup',
  initialState: initialState,
  reducers: {
    setCalssification(state, action) {
      state.calssification = action.payload;
    },
    setFan(state, action) {
      state.fan = action.payload;
    },
    setArtist(state, action) {
      state.artist = action.payload;
    },

    resetInputs(state) {
      Object.assign(state, initialState);
    },
    setFanProfile(state, action) {
      state.fan.profile = action.payload;
    },
    setArtistProfile(state, action) {
      state.artist.profile = action.payload;
    },
    setArtistGroupImg(state, action) {
      state.artist.groupProfile = action.payload;
    },
    resetProfile(state, action) {
      if (action.payload === 'fan') {
        state.fan.profile = initialState.fan.profile;
      } else if (action.payload === 'artist') {
        state.artist.profile = initialState.artist.profile;
      } else if (action.payload === 'group') {
        state.artist.groupProfile = initialState.artist.groupProfile;
        console.log('3초기화');
      }

      // Object.assign(state.fan.img, initialState.fan.img);
    },
  },
});
export const {
  setCalssification,
  setFan,
  setArtist,
  resetInputs,
  resetProfile,
  setFanProfile,
  setArtistProfile,
  setArtistGroupImg,
  setFanId,
  setArtistId,
} = signupSlice.actions;
export default signupSlice.reducer;
