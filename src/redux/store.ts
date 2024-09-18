import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './animeSlice';
import mangaReducer from './mangaSlice';
import detailAnimeSlice from './detailAnimeSlice';
import detailMangaSlice from './detailMangaSlice';
import otherSlice from './otherSlice';

const store = configureStore({
  reducer: {
    anime: animeReducer,
    manga: mangaReducer,
    detailAnime: detailAnimeSlice,
    detailManga: detailMangaSlice,
    other: otherSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
