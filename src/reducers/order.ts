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
const handleToggle = (arr: number[], newId: number, isExist: boolean) => {
  const newArray = isExist
    ? arr.filter((albumId) => albumId !== newId)
    : [...arr, newId];

  return newArray;
};
const getNewlySelectedSongsAfterSingerUnSelect = (
  prevSongsIds: number[],
  avialableSongs: any[]
) => {
  const newSelectedSongs: number[] = [];
  prevSongsIds.map((prevSelectedSong) =>
    avialableSongs.find((newSong) =>
      newSong.songs.find((song: any) => prevSelectedSong === song.id)
    )
      ? newSelectedSongs.push(prevSelectedSong)
      : undefined
  );
  return newSelectedSongs;
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
      const isExists = state.singerIds.includes(action.payload);

      const newSingersIds = handleToggle(
        state.singerIds,
        action.payload,
        isExists
      );
      const updatedAlbums = getAlbumsBySingerIds(newSingersIds);

      state.singerIds = newSingersIds;
      state.filteredAlbums = updatedAlbums;
      //handle side effects and remove previsoly selected albums and songs

      if (isExists) {
        const newSelectedAlbums: number[] = [];
        state.albumIds.forEach((album) =>
          updatedAlbums.find((newAlbum) => newAlbum.id === album)
            ? newSelectedAlbums.push(album)
            : undefined
        );

        state.albumIds = newSelectedAlbums;
        const updatedSongs = getSongsByAlbumsIds(newSelectedAlbums);

        const newSelectedSongs = getNewlySelectedSongsAfterSingerUnSelect(
          [...state.songsIds],
          updatedSongs
        );
        state.price = calculatePrice({
          ...state,
          singerIds: newSingersIds,
          albumIds: newSelectedAlbums,
          songsIds: newSelectedSongs,
        });
        state.songsIds = newSelectedSongs;
        return;
      }

      state.price = calculatePrice({
        ...state,
        singerIds: newSingersIds,
      });
    },
    setAlbumsIds: (state, action: PayloadAction<number>) => {
      const isExists = state.albumIds.includes(action.payload);
      const newAlbumsIds = handleToggle(
        state.albumIds,
        action.payload,
        isExists
      );
      const updatedSongs = getSongsByAlbumsIds(newAlbumsIds);
      state.albumIds = newAlbumsIds;
      state.filteredSongs = updatedSongs;
      let newSelectedSongs: number[] = [];
      if (isExists) {
        newSelectedSongs = getNewlySelectedSongsAfterSingerUnSelect(
          [...state.songsIds],
          updatedSongs
        );
        state.songsIds = newSelectedSongs;
        state.price = calculatePrice({
          ...state,
          albumIds: newAlbumsIds,
          songsIds: newSelectedSongs,
        });
        return;
      }
      state.price = calculatePrice({
        ...state,
        albumIds: newAlbumsIds,
      });
    },
    setSongsIds: (state, action: PayloadAction<number>) => {
      const isExists = state.songsIds.includes(action.payload);

      const newSongsIds = handleToggle(
        state.songsIds,
        action.payload,
        isExists
      );
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
