import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { getPhotosListApi } from '../api/api';

export type PhotoType = {
  id: string;
  username: string;
  fullSizePhotoUrl: string;
  smallPhotoUrl: string;
  description: string;
  alt_description?: string;
};

export type InitialState = {
  photosList: PhotoType[];
  loading: boolean;
};

type ItemType = {
  id: string;
  user: {
    username: string;
  };
  urls: {
    small: string;
    full: string;
  };
  description: string;
  alt_description: string;
};

const photosInitialState: InitialState = { loading: true, photosList: [] };

export const getPhotosList = createAsyncThunk(
  'getPhotos',
  async (page: number) => {
    const response = await getPhotosListApi(page);
    const data: PhotoType[] = response.data.map((i: ItemType) => ({
      id: i.id,
      username: i.user.username,
      smallPhotoUrl: i.urls.small,
      fullSizePhotoUrl: i.urls.full,
      description: i.description ? i.description : i.alt_description,
    }));
    return data;
  },
);

const photosListSlice = createSlice({
  name: 'photosList',
  initialState: photosInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotosList.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(getPhotosList.fulfilled, (state, { payload }) => ({
      ...state,
      photosList: [...state.photosList, ...payload],
      loading: false,
    }));
  },
});

const store = configureStore({ reducer: photosListSlice.reducer });
export default store;
export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>
