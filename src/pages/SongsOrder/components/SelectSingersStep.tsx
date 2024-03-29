import { Box, Typography } from "@mui/material";
import { singersData } from "../../../data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSingersIds } from "../../../reducers/order";
import CheckBoxCard from "../../Orders/components/CheckBoxCard";

const SelectSingersStep = () => {
  const { singerIds } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();
  const isChecked = (id: number) => {
    return singerIds.includes(id);
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
      {singersData.map((singer) => (
        <CheckBoxCard
          key={singer.id}
          id={singer.id}
          checked={isChecked(singer.id)}
          onChange={() => dispatch(setSingersIds(singer.id))}
          renderFirstContent={() => (
            <>
              <Typography variant="h6"> Name: </Typography>
              <Typography variant="h5"> {singer.name}</Typography>
            </>
          )}
          renderSecondContent={() => (
            <>
              <Typography variant="h6"> Albums Count:</Typography>
              <Typography variant="h5"> {singer.albums.length}</Typography>
            </>
          )}
        />
      ))}
    </Box>
  );
};

export default SelectSingersStep;
