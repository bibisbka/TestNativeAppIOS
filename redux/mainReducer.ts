import { getPhotosListApi } from '../api/api';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './reduxStore';

const SET_PHOTOS_LIST = 'SET_PHOTOS_LIST';

export type DataObjType = {
  id: string;
  username: string;
  fullSizePhotoUrl: string;
  smallPhotoUrl: string;
  description: string;
  alt_description?: string;
};

export type DataType = Array<DataObjType>;

export type SetPhotosListActionType = {
  type: typeof SET_PHOTOS_LIST;
  payload: DataType;
};

export type PhotosState = {
  photosList: Array<DataObjType> | [];
};

export type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  SetPhotosListActionType
>;

type DispatchActionType = Dispatch<SetPhotosListActionType>;

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

const initialState: PhotosState = {
  photosList: [],
};

const mainReducer = (
  state = initialState,
  action: SetPhotosListActionType,
): PhotosState => {
  switch (action.type) {
    case SET_PHOTOS_LIST:
      return { ...state, photosList: [...state.photosList, ...action.payload] };
    default:
      return state;
  }
};

const setPhotosList = (data: DataType): SetPhotosListActionType => ({
  type: SET_PHOTOS_LIST,
  payload: data,
});

export const getPhotosList = (page: number): ThunkType => {
  return async (dispatch: DispatchActionType) => {
    const response = await getPhotosListApi(page);
    const data: DataType = response.data.map((i: ItemType) => ({
      id: i.id,
      username: i.user.username,
      smallPhotoUrl: i.urls.small,
      fullSizePhotoUrl: i.urls.full,
      description: i.description ? i.description : i.alt_description,
    }));
    dispatch(setPhotosList(data));
  };
};

export default mainReducer;
