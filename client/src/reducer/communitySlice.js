import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myCommunity: [],
  isUserFan: false,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setMyCommunity: (state, action) => {
      return { ...state, myCommunity: action.payload };
    },
    checkUserFan: (state, action) => {
      return { ...state, isUserFan: action.payload };
    },
    resetCommunity: (state, action) => {
      return { ...state, myCommunity: [], isUserFan: false };
    },
  },
});

export const { setMyCommunity, checkUserFan, resetCommunity } = communitySlice.actions;
export default communitySlice.reducer;
