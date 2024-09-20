import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DetailStudios, Magazine, People, Studios } from "../config/other";
import axios from "../config/axiosConfig";
import { Anime, Pagination } from "../config/data";

// Define the state type
interface OtherState {
    studios: Studios[];
    people : People[];
    magazines: Magazine[];
    animeByStudios: Anime[];
    loading: boolean;
    error : string | null;
    pagination: Pagination;
    detailStudios : DetailStudios | null;

}

// Initial state
const initialState: OtherState = {
    studios: [],
    people : [],
    magazines: [],
    animeByStudios: [],
    detailStudios: null,
    loading: false,
    error : null,
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

// Async thunk for fetching studios
export const fetchStudios = createAsyncThunk(
    'other/fetchStudios',
    async (page: number = 1, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/producers?page=${page}`);
        return {
          data: response.data.data,
          pagination: response.data.pagination, // Pastikan API menyediakan informasi pagination
        };
      } catch (error: any) {
        console.error('Error fetching studios:', error);
        return rejectWithValue(error.response?.data?.message || 'Error fetching studios');
      }
    }
  );
export const fetchPeople = createAsyncThunk(
    'other/fetchPeople',
    async (page: number = 1, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/people?page=${page}`);
        return {
          data: response.data.data,
          pagination: response.data.pagination, // Pastikan API menyediakan informasi pagination
        };
      } catch (error: any) {
        console.error('Error fetching studios:', error);
        return rejectWithValue(error.response?.data?.message || 'Error fetching People');
      }
    }
  );
export const fetchMagazine = createAsyncThunk(
    'other/fetchMagazine',
    async (page: number = 1, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/magazines?page=${page}`);
        return {
          data: response.data.data,
          pagination: response.data.pagination, // Pastikan API menyediakan informasi pagination
        };
      } catch (error: any) {
        console.error('Error fetching studios:', error);
        return rejectWithValue(error.response?.data?.message || 'Error fetching People');
      }
    }
  );

  
  export const fetchAnimeByStudios = createAsyncThunk(
    'other/fetchAnimeByStudios',
    async ({ page = 1, producers }: { page?: number; producers: number }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/anime?producers=${producers}&page=${page}`);
        return {
          data: response.data.data,
          pagination: response.data.pagination, // Pastikan API menyediakan informasi pagination
        };
      } catch (error: any) {
        console.error('Error fetching anime by studios:', error);
        return rejectWithValue(error.response?.data?.message || 'Error fetching anime by studios');
      }
    }
  );

  export const fetchStudioDetails = createAsyncThunk(
    'other/fechDetailStudios',
    async (producers: number, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/producers/${producers}/full`);
        return response.data.data;
      } catch (error: any) {
        console.error('Error fetching detail studios:', error);
        return rejectWithValue(error.response?.data?.message || 'Error fetching detail studios');
      }
    }
  );
  
  

// Create the slice with a unique name
const otherSlice = createSlice({
    name: "other",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudios.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchStudios.fulfilled, (state, action) => {
          state.loading = false;
          state.studios = action.payload.data; // Isi data studios dari API
          state.pagination = action.payload.pagination; // Isi pagination dari API
        })
        .addCase(fetchStudios.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

        .addCase(fetchPeople.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPeople.fulfilled, (state, action) => {
          state.loading = false;
          state.people = action.payload.data; // Isi data studios dari API
          state.pagination = action.payload.pagination; // Isi pagination dari API
        })
        .addCase(fetchPeople.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

        .addCase(fetchMagazine.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMagazine.fulfilled, (state, action) => {
          state.loading = false;
          state.magazines = action.payload.data; // Isi data studios dari API
          state.pagination = action.payload.pagination; // Isi pagination dari API
        })
        .addCase(fetchMagazine.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(fetchAnimeByStudios.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAnimeByStudios.fulfilled, (state, action) => {
          state.loading = false;
          state.animeByStudios = action.payload.data; // Isi data studios dari API
          state.pagination = action.payload.pagination; // Isi pagination dari API
        })
        .addCase(fetchAnimeByStudios.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload as string;
        })

        .addCase(fetchStudioDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchStudioDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.detailStudios = action.payload; // Isi data studios dari API
        })
        .addCase(fetchStudioDetails.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
    },
  });
  

// Export the reducer
export default otherSlice.reducer;
