import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  commentContent: null,
};

const editpostSlice = createSlice({
  name: 'editpost',
  initialState,
  reducers: {
    editpostOpen: (state) => {
      return { ...state, isOpen: true };
    },
    editpostClose: (state) => {
      return { ...state, isOpen: false };
    },
    setCommentContent: (state, action) => {
      return { ...state, commentContent: action.payload };
    },
  },
});

export const { editpostOpen, editpostClose, setCommentContent } = editpostSlice.actions;
export default editpostSlice.reducer;
