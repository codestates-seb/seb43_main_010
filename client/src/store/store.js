import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import signupSlice from '../reducer/signupSlice';
import authSlice from '../reducer/authSlice';
import userSlice from '../reducer/userSlice';
import colorSlice from '../reducer/colorSlice';
import musicSlice from '../reducer/musicSlice';
import editpostSlice from '../reducer/editpostSlice';

const reducers = combineReducers({
  signup: signupSlice,
  auth: authSlice,
  user: userSlice,
  color: colorSlice,
  music: musicSlice,
  editpost: editpostSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // 해당 reducer만 저장
  blacklist: ['signup', 'auth', 'color', 'music', 'editpost'],
};

const persist = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persist,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
