import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLogined: false,
  groupId: null,
};
//이걸로 토큰을 보내서 사용자 정보를 로그인 시에 받아올거다
// 그리고 전역으로 설정해서 모든 페이지 이용시 구분할 수 있게 둘거다.
const userSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setisLogined(state, action) {
      state.isLogined = action.payload;
      // Object.assign(state, initialState);
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setCurrentGroupId(state, action) {
      state.groupId = action.payload;
    },
    logout(state) {
      return { ...state, currentUser: null, isLogined: false, groupId: null };
    },
  },
});
export const { setCurrentUser, setisLogined, setCurrentGroupId, logout, changeName } = userSlice.actions;
export default userSlice.reducer;
