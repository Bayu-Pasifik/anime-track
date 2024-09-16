import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
import { delay } from '../utils/delay';
import { Manga } from '../config/manga';
import { Genre } from '../config/genre';
import { Pagination } from '../config/data';

interface MangaState {
  topManga: Manga[];
  loading: boolean;
  error: string | null;
  genres: Genre[];
  searchResults: Manga[];
  pagination: Pagination;
}

const initialState: MangaState = {
  topManga: [],
  loading: false,
  error: null,
  genres: [],
  searchResults: [],
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

export const fetchMangaData = createAsyncThunk(
  'anime/fetchMangaData',
  async (_, { dispatch }) => {
    await delay(400); // Add delay between requests
    await dispatch(fetchTopManga(1));
  }
);

export const fetchTopManga = createAsyncThunk('anime/fetchTopManga', async (page: number,{ rejectWithValue }) => {
  try {
    const response = await axios.get('/top/manga', {
      params: {
        page,
      },
    });
    console.log({response});
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching top airing:', error);
    // Return error message from server
    return rejectWithValue(error.response?.data?.message || 'Error fetching top airing anime');
  }
});

// Redux slice bagian fetchMangaSearchResults
export const fetchMangaSearchResults = createAsyncThunk(
  "anime/fetchMangaSearchResults",
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
      const response = await axios.get("/manga", {
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

export const fetchMangaGenres = createAsyncThunk("manga/fetchMangaGenres", async () => {
  try {
    const response = await axios.get("/genres/manga");
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching genre:", error);
    throw error.response?.data?.message || "Error fetching genre";
  }
});

const mangaSlice = createSlice({
  name: 'manga',
  initialState,
  reducers: {
    clearMangaSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMangaData.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchMangaData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchMangaData.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTopManga.fulfilled, (state, action) => {
        state.topManga = action.payload;
      })
      .addCase(fetchMangaSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMangaSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload.data;
        state.loading = false;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMangaSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMangaGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMangaGenres.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false
      })
      .addCase(fetchMangaGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      })
      
  },
});


export const { clearMangaSearchResults } = mangaSlice.actions;
export default mangaSlice.reducer;
