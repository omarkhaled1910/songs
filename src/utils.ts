import { singersData } from "./data";
import { OrderForm } from "./reducers/order";

// this one is tricky but i made it as follow if there is songs i will only calcluate the seleted songs
// else i will claculate all the songfs in the selected albums if there is none selected a;bums i will calculate all
// of the slected singers songs
export const calculatePrice = (state: OrderForm) => {
  let price = 0;
  console.log(state, "from calculate");
  if (state.songsIds.length !== 0) {
    console.log("inside songs");
    singersData.forEach((singer) =>
      singer.albums.forEach((album) =>
        album.songs.forEach((song) => {
          if (state.songsIds.includes(song.id)) {
            price += song.price;
          }
        })
      )
    );
    return price;
  }
  if (state.albumIds.length !== 0) {
    singersData.forEach((singer) =>
      singer.albums.forEach((album) => {
        if (state.albumIds.includes(album.id)) {
          album.songs.forEach((song) => {
            price += song.price;
          });
        }
      })
    );
    return price;
  }

  singersData.forEach((singer) => {
    if (state.singerIds.includes(singer.id)) {
      singer.albums.forEach((album) =>
        album.songs.forEach((song) => {
          price += song.price;
        })
      );
    }
  });
  return price;
};

export const dummyOrders = [
  {
    id: "250",
    singerIds: [1, 2, 3],
    albumIds: [1, 50, 2, 200],
    songsIds: [10000, 20000, 11, 12],
    userInfo: {
      name: "oamr first test",
      email: "o@a.c",
      phone: "0102565418",
    },
    price: 220,
  },

  {
    id: "2565",

    singerIds: [1, 2, 3],
    albumIds: [1, 50, 2, 200],
    songsIds: [10000, 20000, 11, 12],
    userInfo: {
      name: "oamr first test",
      email: "o@a.c",
      phone: "0102565418",
    },
    price: 220,
  },

  {
    id: "2845",
    singerIds: [1, 2, 3],
    albumIds: [1, 50, 2, 200],
    songsIds: [10000, 20000, 11, 12],
    userInfo: {
      name: "oamr first test",
      email: "o@a.c",
      phone: "0102565418",
    },
    price: 220,
  },
];
