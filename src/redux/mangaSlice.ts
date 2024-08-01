// src/redux/animeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
import { delay } from '../utils/delay';
import { Manga } from '../config/manga';

interface MangaState {
  topManga: Manga[];
  loading: boolean;
  error: boolean;
}

const initialState: MangaState = {
  topManga: [],
  loading: false,
  error: false,
};

export const fetchAnimeData = createAsyncThunk(
  'anime/fetchAnimeData',
  async (_, { dispatch }) => {
    await delay(400); // Add delay between requests
    await dispatch(fetchTopManga());
  }
);

export const fetchTopManga = createAsyncThunk('anime/fetchTopManga', async () => {
  const response = await axios.get('/top/manga');
  console.log({response});
  return response.data.data;
});

const mangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAnimeData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAnimeData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchTopManga.fulfilled, (state, action) => {
        state.topManga = action.payload;
      })
      
  },
});

export default mangaSlice.reducer;
