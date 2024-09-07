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

export const fetchMangaSearchResults = createAsyncThunk(
  "anime/fetchSearchResults",
  async (params: any) => {
    try {
      const response = await axios.get("/manga", { params });
      return response.data; // Pastikan ini memiliki struktur yang diharapkan
    } catch (error: any) {
      console.error("Error fetching search results:", error);
      throw error.response?.data?.message || "Error fetching search results";
    }
  }
);

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
      .addCase(fetchMangaSearchResults.fulfilled, (state, action) => {
        state.topManga = action.payload;
      })
      .addCase(fetchMangaSearchResults.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchMangaSearchResults.pending, (state) => {
        state.loading = true;
      })
      
  },
});

export default mangaSlice.reducer;
