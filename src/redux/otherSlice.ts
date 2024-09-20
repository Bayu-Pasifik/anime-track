import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DetailStudios, Magazine, People, Studios } from "../config/other";
import axios from "../config/axiosConfig";
import { Anime, Pagination } from "../config/data";
import { Manga } from "../config/manga";

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
    mangaByMagazines : Manga[];

}

// Initial state
const initialState: OtherState = {
    studios: [],
    people : [],
    magazines: [],
    animeByStudios: [],
    mangaByMagazines: [],
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
    async ({ page = 1, query = "" }: { page: number; query: string }, { rejectWithValue }) => {
      try {
        const queryParam = query ? `&q=${query}` : "";
        const response = await axios.get(`/people?page=${page}&order_by=favorites&sort=desc${queryParam}`);
        return {
          data: response.data.data,
          pagination: response.data.pagination, // Ensure API provides pagination information
        };
      } catch (error: any) {
        console.error('Error fetching people:', error);
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

  export const fetchMangaByMagazines = createAsyncThunk(
    'other/fetchMangaByMagneys',
    async ({ page = 1, magazines }: { page?: number; magazines: number }, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/manga?magazines=${magazines}&page=${page}`);
        return {
          data: response.data.data,
          pagination: response.data.pagination, // Pastikan API menyediakan informasi pagination
        };
      } catch (error: any) {
        console.error('Error fetching manga by magneys:', error);
        return rejectWithValue(error.response?.data?.message || 'Error fetching manga by magneys');
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

        .addCase(fetchMangaByMagazines.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchMangaByMagazines.fulfilled, (state, action) => {
          state.loading = false;
          state.mangaByMagazines = action.payload.data; // Isi data studios dari API
          state.pagination = action.payload.pagination; // Isi pagination dari API
        })
        .addCase(fetchMangaByMagazines.rejected, (state,action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
    },
  });
  

// Export the reducer
export default otherSlice.reducer;
