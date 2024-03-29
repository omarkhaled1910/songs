import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAlbumsIds } from "../../../reducers/order";
import CheckBoxCard from "../../Orders/components/CheckBoxCard";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getSingerNameByAlbumId } from "../../../data";
const SelectAlbumsStep = () => {
  const { albumIds, filteredAlbums } = useSelector(
    (state: RootState) => state.order
  );
  const dispatch = useDispatch();
  const isChecked = (id: number) => {
    return albumIds.includes(id);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2, 1fr)",
        },
        columnGap: 12,
        rowGap: 5,
      }}
    >
      {filteredAlbums.map((album) => (
        <CheckBoxCard
          key={album.id}
          id={album.id}
          checked={isChecked(album.id)}
          onChange={() => dispatch(setAlbumsIds(album.id))}
          renderFirstContent={() => (
            <>
              <Typography variant="h6"> Name: </Typography>
              <Typography variant="h5"> {album.name}</Typography>
            </>
          )}
          renderSecondContent={() => (
            <>
              <Typography variant="h6"> Singer Name:</Typography>
              <Typography variant="h5">
                {getSingerNameByAlbumId(album.id)}
              </Typography>
            </>
          )}
          renderThirdContent={() => (
            <>
              <Typography variant="h6"> Songs Count:</Typography>
              <Typography variant="h5"> {album.songs.length}</Typography>
            </>
          )}
        />
      ))}
    </Box>
  );
};

export default SelectAlbumsStep;
