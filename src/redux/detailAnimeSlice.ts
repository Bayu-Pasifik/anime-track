import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
import { AnimeDetail} from '../config/data';
import{CharacterDetail} from '../config/characters';
import { Recommendation } from '../config/animeRecomendation';
import { StaffData } from '../config/staff';
import { Images } from '../config/animeRecomendation';

interface DetailAnime {
  animeDetail: AnimeDetail | null;
  loading: boolean;
  animeCharacter: CharacterDetail[];
  Recommendations: Recommendation[];
  staffAnime: StaffData[];
  animePicture: Images[];
  error: string | null;
}

const initialState: DetailAnime = {
  animeDetail: null,
  loading: false,
  animeCharacter: [],
  Recommendations: [],
  staffAnime: [],
  animePicture: [],
  error: null,
};

// Async Thunks
export const fetchAnimeDetail = createAsyncThunk(
  'anime/fetchAnimeDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/anime/${id}/full`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching anime details');
    }
  }
);

export const fetchAnimeCharacter = createAsyncThunk(
  'anime/fetchAnimeCharacter',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/anime/${id}/characters`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching anime characters');
    }
  }
);

export const fetchAnimeRecommendations = createAsyncThunk(
  'anime/fetchAnimeRecommendations',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/anime/${id}/recommendations`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching anime recommendations');
    }
  }
);

export const fetchStaffAnime = createAsyncThunk(
  'anime/fetchStaffAnime',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/anime/${id}/staff`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching staff anime');
    }
  }
);

export const fetchAnimePicture = createAsyncThunk(
  'anime/fetchAnimePicture',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/anime/${id}/pictures`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching anime pictures');
    }
  }
);

const detailAnimeSlice = createSlice({
  name: 'detailAnime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.animeDetail = action.payload;
        state.loading = false;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchAnimeCharacter.fulfilled, (state, action) => {
        state.animeCharacter = action.payload;
      })
      .addCase(fetchAnimeRecommendations.fulfilled, (state, action) => {
        state.Recommendations = action.payload;
      })
      .addCase(fetchStaffAnime.fulfilled, (state, action) => {
        state.staffAnime = action.payload;
      })
      .addCase(fetchAnimePicture.fulfilled, (state, action) => {
        state.animePicture = action.payload;
      });
  },
});

export default detailAnimeSlice.reducer;
