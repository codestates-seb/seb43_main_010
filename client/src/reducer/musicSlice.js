import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPlaying: false,
  currentMusicId: null,
  currentVolume: 50,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setPlaying: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetPlaying: (state) => {
      return { ...state, isPlaying: false, currentMusicId: null, nextPlaying: null, allMusicLength: null, currentVolume: 50 };
    },
    stopPlaying: (state) => {
      return { ...state, isPlaying: false };
    },
    playing: (state) => {
      return { ...state, isPlaying: true };
    },
  },
});

export const { setPlaying, resetPlaying, stopPlaying, playing } = musicSlice.actions;
export default musicSlice.reducer;
