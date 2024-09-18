import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Studios } from "../config/other";
import axios from "../config/axiosConfig";
import { Pagination } from "../config/data";

// Define the state type
interface OtherState {
    studios: Studios[];
    loading: boolean;
    error : string | null;
    pagination: Pagination;
}

// Initial state
const initialState: OtherState = {
    studios: [],
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
        .addCase(fetchStudios.rejected, (state) => {
          state.loading = false;
        });
    },
  });
  

// Export the reducer
export default otherSlice.reducer;
