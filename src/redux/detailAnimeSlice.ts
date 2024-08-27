import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
import { AnimeDetail} from '../config/data';
import{CharacterDetail} from '../config/characters';
import { Recommendation } from '../config/animeRecomendation';
import { StaffData } from '../config/staff';
import { Images } from '../config/animeRecomendation';
import { delay } from '../utils/delay'; 

interface DetailAnime {
  animeDetail: AnimeDetail | null;
  animeCharacter: CharacterDetail[];
  Recommendations: Recommendation[];
  staffAnime: StaffData[];
  animePicture: Images[];
  loading: {
    detail: boolean;
    character: boolean;
    recommendations: boolean;
    staff: boolean;
    pictures: boolean;
  };
  error: {
    detail: string | null;
    character: string | null;
    recommendations: string | null;
    staff: string | null;
    pictures: string | null;
  };
}

const initialState: DetailAnime = {
  animeDetail: null,
  animeCharacter: [],
  Recommendations: [],
  staffAnime: [],
  animePicture: [],
  loading: {
    detail: false,
    character: false,
    recommendations: false,
    staff: false,
    pictures: false,
  },
  error: {
    detail: null,
    character: null,
    recommendations: null,
    staff: null,
    pictures: null,
  },
};


// Async Thunks
export const fetchAnimeDetail = createAsyncThunk(
  'anime/fetchAnimeDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      await delay(400); // Add delay
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
      await delay(400);
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
      await delay(400);
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
      await delay(400);
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
      await delay(400);
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
      // Anime Detail
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading.detail = true;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action) => {
        state.animeDetail = action.payload;
        state.loading.detail = false;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.error.detail = action.payload as string;
        state.loading.detail = false;
      })
      // Anime Character
      .addCase(fetchAnimeCharacter.pending, (state) => {
        state.loading.character = true;
      })
      .addCase(fetchAnimeCharacter.fulfilled, (state, action) => {
        state.animeCharacter = action.payload;
        state.loading.character = false;
      })
      .addCase(fetchAnimeCharacter.rejected, (state, action) => {
        state.error.character = action.payload as string;
        state.loading.character = false;
      })
      // Anime Recommendations
      .addCase(fetchAnimeRecommendations.pending, (state) => {
        state.loading.recommendations = true;
      })
      .addCase(fetchAnimeRecommendations.fulfilled, (state, action) => {
        state.Recommendations = action.payload;
        state.loading.recommendations = false;
      })
      .addCase(fetchAnimeRecommendations.rejected, (state, action) => {
        state.error.recommendations = action.payload as string;
        state.loading.recommendations = false;
      })
      // Staff Anime
      .addCase(fetchStaffAnime.pending, (state) => {
        state.loading.staff = true;
      })
      .addCase(fetchStaffAnime.fulfilled, (state, action) => {
        state.staffAnime = action.payload;
        state.loading.staff = false;
      })
      .addCase(fetchStaffAnime.rejected, (state, action) => {
        state.error.staff = action.payload as string;
        state.loading.staff = false;
      })
      // Anime Picture
      .addCase(fetchAnimePicture.pending, (state) => {
        state.loading.pictures = true;
      })
      .addCase(fetchAnimePicture.fulfilled, (state, action) => {
        state.animePicture = action.payload;
        state.loading.pictures = false;
      })
      .addCase(fetchAnimePicture.rejected, (state, action) => {
        state.error.pictures = action.payload as string;
        state.loading.pictures = false;
      });
  },
});

export default detailAnimeSlice.reducer;

