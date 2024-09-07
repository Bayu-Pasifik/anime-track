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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  genres: Genre[];
  hasMore: boolean, // Start with assuming there is more data
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
  hasMore: true, // Start with assuming there is more data
  searchResults: [],
    status: 'idle',
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
      const genreParam = selectedGenres.length
        ? selectedGenres.join(",")
        : undefined;
      const response = await axios.get("/anime", {
        params: {
          q: query || undefined, // Jika query kosong, jangan sertakan
          genres: genreParam || undefined, // Genre filter
          type: type || undefined, // Type filter
          status: statusFilter || undefined, // Status filter
          order_by: "popularity", // Mengurutkan berdasarkan popularitas
          page: page || 1, // Pagination
        },
      });
      return { data: response.data.data, page }; // Kirim data dan halaman saat ini
    } catch (error: any) {
      console.error("Error fetching search results:", error);
      return rejectWithValue(error.response?.data?.message || "Error fetching search results");
    }
  }
);


const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers:  {},
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
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        const { data, page } = action.payload;
        if (page === 1) {
          // Jika halaman pertama, ganti seluruh data
          state.searchResults = data;
        } else {
          // Jika halaman selanjutnya, tambahkan hasil baru
          state.searchResults = [...state.searchResults, ...data];
        }
        state.status = 'succeeded';
        // Update hasMore jika masih ada data baru
        state.hasMore = data.length > 0;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
export default animeSlice.reducer;
