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
  error: string | null;  // Change error type to string | null
  pagination: Pagination;
}

const initialState: AnimeState = {
  topAiring: [],
  currentlyAiring: [],
  upcoming: [],
  popular: [],
  loading: false,
  error: null,  // Initialize error as null
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
    await dispatch(fetchUpcomingAnime(1));
    await delay(400); // Add delay between requests
    await dispatch(fetchPopularAnime(1));
  }
);

export const fetchTopAiring = createAsyncThunk(
  'anime/fetchTopAiring',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/top/anime');
      return response.data.data;  // Ensure this is an array
    } catch (error: any) {
      console.error('Error fetching top airing:', error);
      // Return error message from server
      return rejectWithValue(error.response?.data?.message || 'Error fetching top airing anime');
    }
  }
);

export const fetchCurrentlyAiring = createAsyncThunk(
  'anime/fetchCurrentlyAiring',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get('/seasons/now', {
        params: { page, sfw: true },
      });
      return response.data;  // Ensure this has the expected structure
    } catch (error: any) {
      console.error('Error fetching currently airing:', error);
      // Return error message from server
      return rejectWithValue(error.response?.data?.message || 'Error fetching currently airing anime');
    }
  }
);

export const fetchUpcomingAnime = createAsyncThunk(
  'anime/fetchUpcomingAnime',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get('/seasons/upcoming', {
        params: { page, sfw: true },
      });
      return response.data;  // Ensure this has the expected structure
    } catch (error: any) {
      console.error('Error fetching upcoming anime:', error);
      // Return error message from server
      return rejectWithValue(error.response?.data?.message || 'Error fetching upcoming anime');
    }
  }
);

export const fetchPopularAnime = createAsyncThunk(
  'anime/fetchPopularAnime',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get('/anime', {
        params: { order_by: 'popularity', type: 'tv', sfw: true, page },
      });
      return response.data;  // Ensure this has the expected structure
    } catch (error: any) {
      console.error('Error fetching popular anime:', error);
      // Return error message from server
      return rejectWithValue(error.response?.data?.message || 'Error fetching popular anime');
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
        state.error = null; // Reset error on new request
      })
      .addCase(fetchAnimeData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchAnimeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Set error message from payload
      })
      .addCase(fetchTopAiring.fulfilled, (state, action) => {
        state.topAiring = action.payload;  // Ensure action.payload is an array
      })
      .addCase(fetchCurrentlyAiring.fulfilled, (state, action) => {
        state.currentlyAiring = [...state.currentlyAiring, ...action.payload.data];  // Ensure action.payload.data is an array
        state.pagination = action.payload.pagination;  // Ensure action.payload has pagination
      })
      .addCase(fetchUpcomingAnime.fulfilled, (state, action) => {
        state.upcoming = [...state.upcoming, ...action.payload.data];  // Ensure action.payload.data is an array
        state.pagination = action.payload.pagination;  // Ensure action.payload has pagination
      })
      .addCase(fetchPopularAnime.fulfilled, (state, action) => {
        state.popular = [...state.popular, ...action.payload.data];  // Ensure action.payload.data is an array
        state.pagination = action.payload.pagination;  // Ensure action.payload has pagination
      })
      .addCase(fetchTopAiring.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentlyAiring.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchUpcomingAnime.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchPopularAnime.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default animeSlice.reducer;
