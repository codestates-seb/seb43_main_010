import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
};
//이걸로 토큰을 보내서 사용자 정보를 로그인 시에 받아올거다
// 그리고 전역으로 설정해서 모든 페이지 이용시 구분할 수 있게 둘거다.
const userSlice = createSlice({
  name: 'currentUser',
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      // Object.assign(state, initialState);
    },
  },
});
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
