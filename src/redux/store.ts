import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './animeSlice';
import mangaReducer from './mangaSlice';
import detailAnimeSlice from './detailAnimeSlice';

const store = configureStore({
  reducer: {
    anime: animeReducer,
    manga: mangaReducer,
    detailAnime: detailAnimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
