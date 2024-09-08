import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axiosConfig';
// import { AnimeDetail} from '../config/data';
import { AnimeCharacter, MangaCharacter } from '../config/characters';
import { Recommendation } from '../config/animeRecomendation';
import { StaffData } from '../config/staff';
import { Images } from '../config/animeRecomendation';
import { delay } from '../utils/delay';
import { Person } from '../config/person';
import { Manga } from '../config/manga';

interface DetailManga {
  mangaDetail: Manga | null;
  mangaCharacter: MangaCharacter[];
  mangaRecommendations: Recommendation[];
  staffManga: StaffData[];
  mangaPictures: Images[];
  detailMangaCharacter: AnimeCharacter | null;
  detailMangaStaff: Person | null;
  loading: {
    detail: boolean;
    character: boolean;
    mangaRecommendations: boolean;
    staff: boolean;
    pictures: boolean;
    detailMangaCharacter:boolean;
    detailMangaStaff: boolean;
  };
  error: {
    detail: string | null;
    character: string | null;
    mangaRecommendations: string | null;
    staff: string | null;
    pictures: string | null;
    detailMangaCharacter: string | null;
    detailMangaStaff: string | null;
  };
}

const initialState: DetailManga = {
  mangaDetail: null,
  mangaCharacter: [],
  mangaRecommendations: [],
  staffManga: [],
  mangaPictures: [],
  detailMangaCharacter: null,
  detailMangaStaff: null,
  loading: {
    detail: false,
    character: false,
    mangaRecommendations: false,
    staff: false,
    pictures: false,
    detailMangaCharacter:false,
    detailMangaStaff: false,
  },
  error: {
    detail: null,
    character: null,
    mangaRecommendations: null,
    staff: null,
    pictures: null,
    detailMangaCharacter: null,
    detailMangaStaff: null,
  },
};

// Async Thunks
export const fetchMangaDetail = createAsyncThunk(
  'manga/fetchMangaDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      await delay(1000); // Delay lebih besar
      const response = await axios.get(`/manga/${id}/full`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching manga details');
    }
  }
);

export const fetchMangaCharacter = createAsyncThunk(
  'manga/fetchMangaCharacter',
  async (id: string, { rejectWithValue }) => {
    try {
      // await delay(1000);
      const response = await axios.get(`/manga/${id}/characters`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching manga characters');
    }
  }
);

export const fetchMangaRecomendation = createAsyncThunk(
  'manga/fetchMangaRecomendation',
  async (id: string, { rejectWithValue }) => {
    try {
      // await delay(1000);
      const response = await axios.get(`/manga/${id}/recommendations`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching manga recommendations');
    }
  }
);


export const fetchMangaPictures = createAsyncThunk(
  'manga/fetchMangaPictures',
  async (id: string, { rejectWithValue }) => {
    try {
      // await delay(1000);
      const response = await axios.get(`/manga/${id}/pictures`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching manga pictures');
    }
  }
);


export const fetchDetailMangaCharacter = createAsyncThunk(
  'manga/fetchDetailMangaCharacter',
  async (id: string, { rejectWithValue }) => {
    try {
      // await delay(1000);
      const response = await axios.get(`/characters/${id}/full`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error fetching detail staff');
    }
  }
);


const detailManga = createSlice({
  name: 'detailManga',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // manga Detail
      .addCase(fetchMangaDetail.pending, (state) => {
        state.loading.detail = true;
      })
      .addCase(fetchMangaDetail.fulfilled, (state, action) => {
        state.mangaDetail = action.payload;
        state.loading.detail = false;
      })
      .addCase(fetchMangaDetail.rejected, (state, action) => {
        state.error.detail = action.payload as string;
        state.loading.detail = false;
      })
      // Anime Characters
      .addCase(fetchMangaCharacter.pending, (state) => {
        state.loading.character = true;
      })
      .addCase(fetchMangaCharacter.fulfilled, (state, action) => {
        state.mangaCharacter = action.payload;
        state.loading.character = false;
      })
      .addCase(fetchMangaCharacter.rejected, (state, action) => {
        state.error.character = action.payload as string;
        state.loading.character = false;
      })
      // Recommendations
      .addCase(fetchMangaRecomendation.pending, (state) => {
        state.loading.mangaRecommendations = true;
      })
      .addCase(fetchMangaRecomendation.fulfilled, (state, action) => {
        state.mangaRecommendations = action.payload;
        state.loading.mangaRecommendations = false;
      })
      .addCase(fetchMangaRecomendation.rejected, (state, action) => {
        state.error.mangaRecommendations = action.payload as string;
        state.loading.mangaRecommendations = false;
      })
      // Anime Pictures
      .addCase(fetchMangaPictures.pending, (state) => {
        state.loading.pictures = true;
      })
      .addCase(fetchMangaPictures.fulfilled, (state, action) => {
        state.mangaPictures = action.payload;
        state.loading.pictures = false;
      })
      .addCase(fetchMangaPictures.rejected, (state, action) => {
        state.error.pictures = action.payload as string;
        state.loading.pictures = false;
      })

    // Detail Character
    .addCase(fetchDetailMangaCharacter.pending, (state) => {
      state.loading.detailMangaCharacter = true;
    })
    .addCase(fetchDetailMangaCharacter.fulfilled, (state, action) => {
      state.detailMangaCharacter = action.payload;
      state.loading.detailMangaCharacter = false;
    })
    .addCase(fetchDetailMangaCharacter.rejected, (state, action) => {
      state.error.detailMangaCharacter = action.payload as string;
      state.loading.detailMangaCharacter = false;
    })
  },
});

export default detailManga.reducer;
