import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  commentContent: null,
  targetPostId: null,
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
    setTargetPostId: (state, action) => {
      return { ...state, targetPostId: action.payload };
    },
  },
});

export const { editpostOpen, editpostClose, setCommentContent, setTargetPostId } = editpostSlice.actions;
export default editpostSlice.reducer;
