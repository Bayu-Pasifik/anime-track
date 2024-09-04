import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
import { Anime, Pagination } from '../config/data';
import { delay } from '../utils/delay';  // Import delay function

interface AnimeState {
  topAiring: Anime[];
  currentlyAiring: Anime[];
  upcoming: Anime[];
  popular: Anime[];
  loading: boolean;
  error: boolean;
  pagination: Pagination;
}

const initialState: AnimeState = {
  topAiring: [],
  currentlyAiring: [],
  upcoming: [],
  popular: [],
  loading: false,
  error: false,
  pagination: {
    current_page: 1,
    last_visible_page: 1,
    has_next_page: false,
    items: {
      count: 0,
      total: 0,
      per_page: 0,
    },
  },
};

export const fetchAnimeData = createAsyncThunk(
  'anime/fetchAnimeData',
  async (_, { dispatch }) => {
    await dispatch(fetchTopAiring());
    await delay(400); // Add delay between requests
    await dispatch(fetchCurrentlyAiring(1));
    await delay(400); // Add delay between requests
    await dispatch(fetchUpcomingAnime());
    await delay(400); // Add delay between requests
    await dispatch(fetchPopularAnime());
  }
);

export const fetchTopAiring = createAsyncThunk(
  'anime/fetchTopAiring',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/top/anime');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching top airing:', error);
      return rejectWithValue('Error fetching top airing anime');
    }
  }
);

export const fetchCurrentlyAiring = createAsyncThunk(
  'anime/fetchCurrentlyAiring',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get('/seasons/now', {
        params: { page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching currently airing:', error);
      return rejectWithValue('Error fetching currently airing anime');
    }
  }
);

export const fetchUpcomingAnime = createAsyncThunk(
  'anime/fetchUpcomingAnime',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/seasons/upcoming');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching upcoming anime:', error);
      return rejectWithValue('Error fetching upcoming anime');
    }
  }
);

export const fetchPopularAnime = createAsyncThunk(
  'anime/fetchPopularAnime',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/anime', {
        params: { order_by: 'popularity', type: 'tv', sfw: true },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching popular anime:', error);
      return rejectWithValue('Error fetching popular anime');
    }
  }
);

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
        state.loading = false;
        state.currentlyAiring = [...state.currentlyAiring, ...action.payload.data];
        state.pagination = action.payload.pagination;
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
