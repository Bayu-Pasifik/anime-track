import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
import { Anime, Pagination } from '../config/data';
import { delay } from '../utils/delay';  // Import delay function
import { Genre } from '../config/genre';

interface AnimeState {
  topAiring: Anime[];
  currentlyAiring: Anime[];
  upcoming: Anime[];
  popular: Anime[];
  loading: boolean;
  error: string | null;  // Change error type to string | null
  pagination: Pagination;
  searchResults: Anime[];
  genres: Genre[];
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
  searchResults: [],
    genres: [],
    
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

export const fetchGenre = createAsyncThunk("anime/fetchGenre", async () => {
  try {
    const response = await axios.get("/genres/anime");
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching genre:", error);
    throw error.response?.data?.message || "Error fetching genre";
  }
});

// Redux slice bagian fetchSearchResults
export const fetchSearchResults = createAsyncThunk(
  "anime/fetchSearchResults",
  async (
    {
      query,
      selectedGenres,
      type,
      statusFilter,
      page,
    }: {
      query: string;
      selectedGenres: number[];
      type: string;
      statusFilter: string;
      page: number;
    },
    { rejectWithValue }
  ) => {
    try {
      // Delay kecil untuk mengurangi frekuensi request jika dibutuhkan
      await delay(500);

      const genreParam = selectedGenres.length
        ? selectedGenres.join(",")
        : undefined;

      // Hit API hanya untuk 1 halaman, sesuai dengan parameter page
      const response = await axios.get("/anime", {
        params: {
          q: query || undefined,
          genres: genreParam || undefined,
          type: type || undefined,
          status: statusFilter || undefined,
          order_by: "popularity",
          page: page || 1,  // Pastikan hanya request untuk 1 halaman
        },
      });
      let urlReq = response.request.responseURL;
      console.log({urlReq});
     return response.data;
    } catch (error: any) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error fetching search results"
      );
    }
  }
);




const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers:  {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
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
      })
      .addCase(fetchGenre.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResults = [...state.searchResults, ...action.payload.data];
        state.loading = false;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the action
export const { clearSearchResults } = animeSlice.actions;
export default animeSlice.reducer;