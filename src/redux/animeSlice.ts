import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
import { Anime } from '../config/data';
import { delay } from '../utils/delay';  // Import delay function

interface AnimeState {
  topAiring: Anime[];
  currentlyAiring: Anime[];
  upcoming: Anime[];
  popular: Anime[];
  loading: boolean;
  error: boolean;
}

const initialState: AnimeState = {
  topAiring: [],
  currentlyAiring: [],
  upcoming: [],
  popular: [],
  loading: false,
  error: false,
};

export const fetchAnimeData = createAsyncThunk(
  'anime/fetchAnimeData',
  async (_, { dispatch }) => {
    await dispatch(fetchTopAiring());
    await delay(400); // Add delay between requests
    await dispatch(fetchCurrentlyAiring());
    await delay(400); // Add delay between requests
    await dispatch(fetchUpcomingAnime());
    await delay(400); // Add delay between requests
    await dispatch(fetchPopularAnime());
  }
);

export const fetchTopAiring = createAsyncThunk('anime/fetchTopAiring', async () => {
  const response = await axios.get('/top/anime');
  return response.data.data;
});

export const fetchCurrentlyAiring = createAsyncThunk('anime/fetchCurrentlyAiring', async () => {
  const response = await axios.get('/seasons/now');
  return response.data.data;
});

export const fetchUpcomingAnime = createAsyncThunk('anime/fetchUpcomingAnime', async () => {
  const response = await axios.get('/seasons/upcoming');
  return response.data.data;
});

export const fetchPopularAnime = createAsyncThunk('anime/fetchPopularAnime', async () => {
  const response = await axios.get('/anime', {
    params: { order_by: 'popularity', type: 'tv', sfw: true },
  });
  return response.data.data;
});

const animeSlice = createSlice({
  name: 'anime',
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
      .addCase(fetchTopAiring.fulfilled, (state, action) => {
        state.topAiring = action.payload;
      })
      .addCase(fetchCurrentlyAiring.fulfilled, (state, action) => {
        state.currentlyAiring = action.payload;
      })
      .addCase(fetchUpcomingAnime.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })
      .addCase(fetchPopularAnime.fulfilled, (state, action) => {
        state.popular = action.payload;
      })
      .addCase(fetchTopAiring.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchCurrentlyAiring.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchUpcomingAnime.rejected, (state) => {
        state.error = true;
      })
      .addCase(fetchPopularAnime.rejected, (state) => {
        state.error = true;
      });
  },
});

export default animeSlice.reducer;
