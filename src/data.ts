export const singersData = [
  {
    id: 1,
    name: "Taylor Swift",
    albums: [
      {
        id: 1,
        name: "Fearless",
        songs: [
          { id: 1, name: "Fearless", albumId: 1, price: 200 },
          { id: 2, name: "Fifteen", albumId: 1, price: 200 },
          { id: 3, name: "Love Story", albumId: 1, price: 200 },
          // Add more songs
        ],
      },
      {
        id: 2,
        name: "Speak Now",
        songs: [
          { id: 11, name: "Mine", albumId: 2, price: 90 },
          { id: 12, name: "Sparks Fly", albumId: 2, price: 80 },
          { id: 13, name: "Back to December", albumId: 2, price: 40 },
          // Add more songs
        ],
      },
      {
        id: 50,
        name: "Fearless vol 2",
        songs: [
          { id: 10000, name: "Fearless vol 2", albumId: 1, price: 30 },
          { id: 20000, name: "Fifteen vol 2", albumId: 1, price: 20 },
          { id: 3000000, name: "Love Story vol 2", albumId: 1, price: 20 },
          // Add more songs
        ],
      },
      {
        id: 200,
        name: "Speak Now vol 2",
        songs: [
          { id: 110001, name: "Mine vol 2", albumId: 2, price: 10 },
          { id: 10002, name: "Sparks Fly vol 2", albumId: 2, price: 20 },
          {
            id: 1000003,
            name: "Back to December vol 2",
            albumId: 2,
            price: 100,
          },
          // Add more songs
        ],
      },
      // Add more albums
    ],
  },
  {
    id: 2,
    name: "Ed Sheeran",
    albums: [
      {
        id: 3,
        name: "Truth",
        songs: [
          { id: 21, name: "The A Team", albumId: 3, price: 200 },
          { id: 22, name: "Lego House", albumId: 3, price: 200 },
          { id: 23, name: "Give Me Love", albumId: 3, price: 200 },
          // Add more songs
        ],
      },
      {
        id: 4,
        name: "Lies",
        songs: [
          { id: 31, name: "Sing", albumId: 4, price: 200 },
          { id: 32, name: "Thinking Out Loud", albumId: 4, price: 200 },
          { id: 33, name: "Photograph", albumId: 4, price: 200 },
          // Add more songs
        ],
      },
      // Add more albums
    ],
  },
  {
    id: 3,
    name: "Beyoncé",
    albums: [
      {
        id: 5,
        name: "Dangerously in Love",
        songs: [
          { id: 41, name: "Crazy in Love", albumId: 5, price: 200 },
          { id: 42, name: "Naughty Girl", albumId: 5, price: 200 },
          { id: 43, name: "Baby Boy", albumId: 5, price: 200 },
          // Add more songs
        ],
      },
      {
        id: 6,
        name: "Lemonade",
        songs: [
          { id: 51, name: "Formation", albumId: 6, price: 200 },
          { id: 52, name: "Sorry", albumId: 6, price: 200 },
          { id: 53, name: "Hold Up", albumId: 6, price: 200 },
          // Add more songs
        ],
      },
      // Add more albums
    ],
  },
  {
    id: 4,
    name: "Kanye West",
    albums: [
      {
        id: 9,
        name: "The College Dropout",
        songs: [
          { id: 81, name: "Through the Wire", albumId: 9, price: 200 },
          { id: 82, name: "Jesus Walks", albumId: 9, price: 200 },
          { id: 83, name: "All Falls Down", albumId: 9, price: 200 },
          // Add more songs
        ],
      },
      {
        id: 10,
        name: "My Beautiful Dark Twisted Fantasy",
        songs: [
          { id: 91, name: "Runaway", albumId: 1, price: 2000 },
          { id: 92, name: "Power", albumId: 1, price: 2000 },
          { id: 93, name: "Monster", albumId: 1, price: 2000 },
          // Add more songs
        ],
      },
      // Add more albums
    ],
  },
  {
    id: 5,
    name: "Drake",
    albums: [
      {
        id: 7,
        name: "Take Care",
        songs: [
          { id: 61, name: "Over My Dead Body", albumId: 7, price: 200 },
          { id: 62, name: "Headlines", albumId: 7, price: 200 },
          { id: 63, name: "Crew Love", albumId: 7, price: 200 },
          // Add more songs
        ],
      },
      {
        id: 8,
        name: "Views",
        songs: [
          { id: 71, name: "Hotline Bling", albumId: 8, price: 200 },
          { id: 72, name: "One Dance", albumId: 8, price: 200 },
          { id: 73, name: "Controlla", albumId: 8, price: 200 },
          // Add more songs
        ],
      },
      // Add more albums
    ],
  },
  // Add more singers
];

export type TSong = {
  id: number;
  name: string;
  albumId: number;
  price: number;
};
export type TAlbum = {
  id: number;
  name: string;
  songs: TSong[];
};
const singerMap = new Map();
const albumsMap = new Map();

singersData.forEach((singer) => {
  singerMap.set(singer.id, singer);
  singer.albums.forEach((album) => albumsMap.set(album.id, album));
});

export const getAlbumsBySingerIds = (singerIds: number[]) => {
  if (singerIds.length === 0) return [];
  const albums: TAlbum[] = [];
  singerIds.forEach((singerId) => {
    const singer = singerMap.get(singerId);
    singer.albums.length && albums.push(...singer.albums);
  });

  return albums;
};

export const getSongsByAlbumsIds = (albumIds: number[]) => {
  if (albumIds.length === 0) return [];
  const songs: any[] = [];
  albumIds.forEach((albumId) => {
    const album = albumsMap.get(albumId);
    album.songs.length &&
      songs.push({ albumName: album.name, songs: [...album.songs] });
  });
  return songs;
};

export const getSingerNameByAlbumId = (albumId: number) => {
  let singerName = "";
  singersData.forEach((singer) =>
    singer.albums.forEach((album) =>
      album.id === albumId ? (singerName = singer.name) : undefined
    )
  );

  return singerName;
};
