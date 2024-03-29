import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const OrderDetails = () => {
  const { singerIds, albumIds, songsIds, price } = useSelector(
    (state: RootState) => state.order
  );

  return (
    <Stack gap={3}>
      <Typography variant="h5">Order Details</Typography>

      <Stack alignItems={"center"} gap={2} direction={"row"}>
        <Typography variant="h6">Slected Singers :</Typography>
        <Typography variant="h6">{singerIds.length}</Typography>
      </Stack>
      <Stack alignItems={"center"} gap={2} direction={"row"}>
        <Typography variant="h6">Slected Albums :</Typography>
        <Typography variant="h6">{albumIds.length}</Typography>
      </Stack>
      <Stack alignItems={"center"} gap={2} direction={"row"}>
        <Typography variant="h6">Slected Songs :</Typography>
        <Typography variant="h6">{songsIds.length}</Typography>
      </Stack>

      {!!price && (
        <Stack alignItems={"center"} gap={2} direction={"row"}>
          <Typography variant="h6">Total Price :</Typography>
          <Typography variant="h6">{price} $</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default OrderDetails;
