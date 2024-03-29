import {
  TAlbum,
  TSong,
  getAlbumsBySingerIds,
  getSongsByAlbumsIds,
} from "./../data";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface Order {
  orderId: number;
  singerIds: number[];
  albumIds: number[];
  songsIds: number[];
  price: number;
  filteredAlbums: TAlbum[];
  filteredSongs: { songs: TSong[]; albumName: string }[];
}
const handleToggle = (arr: number[], newId: number) => {
  const newArray = arr.includes(newId)
    ? arr.filter((albumId) => albumId !== newId)
    : [...arr, newId];

  return newArray;
};

// Define the initial state using that type
const initialState: Order = {
  orderId: 0,
  price: 0,
  singerIds: [],
  albumIds: [],
  songsIds: [],
  filteredAlbums: [],
  filteredSongs: [],
};

export const OrderSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSingersIds: (state, action: PayloadAction<number>) => {
      const newSingersIds = handleToggle(state.singerIds, action.payload);

      state.singerIds = newSingersIds;
      state.filteredAlbums = getAlbumsBySingerIds(newSingersIds);
    },
    setAlbumsIds: (state, action: PayloadAction<number>) => {
      const newAlbumsIds = handleToggle(state.albumIds, action.payload);

      state.albumIds = newAlbumsIds;
      state.filteredSongs = getSongsByAlbumsIds(newAlbumsIds);
    },
    setSongsIds: (state, action: PayloadAction<number>) => {
      const newSongsIds = handleToggle(state.songsIds, action.payload);

      state.songsIds = newSongsIds;
    },
  },
});

export const { setAlbumsIds, setSingersIds, setSongsIds } = OrderSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default OrderSlice.reducer;
