// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './animeSlice';
import mangaReducer from './mangaSlice';

const store = configureStore({
  reducer: {
    anime: animeReducer,
    manga: mangaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
