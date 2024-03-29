import {
  TAlbum,
  TSong,
  getAlbumsBySingerIds,
  getSongsByAlbumsIds,
} from "./../data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { calculatePrice } from "../utils";

type UserData = {
  name: string;
  email: string;
  phone: string;
};
export interface OrderForm {
  singerIds: number[];
  albumIds: number[];
  songsIds: number[];
  price: number;
  filteredAlbums: TAlbum[];
  filteredSongs: { songs: TSong[]; albumName: string }[];
  userInfo: UserData;
}
const handleToggle = (arr: number[], newId: number) => {
  const newArray = arr.includes(newId)
    ? arr.filter((albumId) => albumId !== newId)
    : [...arr, newId];

  return newArray;
};

const initialState: OrderForm = {
  price: 0,
  singerIds: [],
  albumIds: [],
  songsIds: [],
  filteredAlbums: [],
  filteredSongs: [],
  userInfo: {
    name: "",
    email: "",
    phone: "",
  },
};

export const OrderFormSlice = createSlice({
  name: "songOrderForm",
  initialState,
  reducers: {
    setSingersIds: (state, action: PayloadAction<number>) => {
      const newSingersIds = handleToggle(state.singerIds, action.payload);

      state.singerIds = newSingersIds;
      state.filteredAlbums = getAlbumsBySingerIds(newSingersIds);
      state.price = calculatePrice({ ...state, singerIds: newSingersIds });
    },
    setAlbumsIds: (state, action: PayloadAction<number>) => {
      const newAlbumsIds = handleToggle(state.albumIds, action.payload);

      state.albumIds = newAlbumsIds;
      state.filteredSongs = getSongsByAlbumsIds(newAlbumsIds);
      state.price = calculatePrice({ ...state, albumIds: newAlbumsIds });
    },
    setSongsIds: (state, action: PayloadAction<number>) => {
      const newSongsIds = handleToggle(state.songsIds, action.payload);
      state.songsIds = newSongsIds;
      state.price = calculatePrice({ ...state, songsIds: newSongsIds });
    },
    setBulkSongsIds: (state, action: PayloadAction<number[]>) => {
      state.songsIds = action.payload;
    },
    setBulkSingersIds: (state, action: PayloadAction<number[]>) => {
      state.singerIds = action.payload;
      state.filteredAlbums = getAlbumsBySingerIds(action.payload);
    },
    setBulkAlbumsIds: (state, action: PayloadAction<number[]>) => {
      state.albumIds = action.payload;
      state.filteredSongs = getSongsByAlbumsIds(action.payload);
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },

    setUserInfo: (
      state,
      action: PayloadAction<{ key: string; val: string }>
    ) => {
      state.userInfo = {
        ...state.userInfo,
        [action.payload.key]: action.payload.val,
      };
    },
    resetForm: (state) => {
      state.singerIds = [];
      state.albumIds = [];
      state.songsIds = [];
      state.filteredAlbums = [];
      state.filteredSongs = [];
      state.price = 0;
      state.userInfo = {
        name: "",
        email: "",
        phone: "",
      };
    },
  },
});

export const {
  setAlbumsIds,
  setSingersIds,
  setSongsIds,
  setUserInfo,
  resetForm,
  setBulkSongsIds,
  setBulkAlbumsIds,
  setBulkSingersIds,
  setPrice,
} = OrderFormSlice.actions;

export default OrderFormSlice.reducer;
