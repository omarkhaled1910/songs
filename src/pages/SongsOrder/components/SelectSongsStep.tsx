import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSongsIds } from "../../../reducers/order";
import { Box, Stack, Typography, Checkbox } from "@mui/material";

const SelectSongsStep = () => {
  const { songsIds, filteredSongs } = useSelector(
    (state: RootState) => state.order
  );
  const dispatch = useDispatch();
  const isChecked = (id: number) => {
    return songsIds.includes(id);
  };

  return (
    <Stack gap={3}>
      {filteredSongs.map((songWithAlbum) => (
        <Box
          key={songWithAlbum.albumName}
          borderRadius={"3px"}
          border={"1px solid black"}
        >
          <Stack>
            <Typography p={"10px"} borderBottom={"1px solid black"}>
              {songWithAlbum.albumName}
            </Typography>
            {songWithAlbum.songs.map((song) => (
              <Stack key={song.id} alignItems={"center"} direction={"row"}>
                <Checkbox
                  onChange={() => dispatch(setSongsIds(song.id))}
                  checked={isChecked(song.id)}
                />
                <Typography>{song.name}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default SelectSongsStep;
