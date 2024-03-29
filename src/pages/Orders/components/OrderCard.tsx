import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "../../../reducers/order";

const OrderCard = ({ order }: { order: Partial<OrderForm & { id: any }> }) => {
  const navigate = useNavigate();
  return (
    <Box
      padding={2}
      sx={{
        cursor: "pointer",
        border: "1px solid black",
        borderRadius: "6px",
      }}
      onClick={() => navigate(`/edit/${order.id}`)}
    >
      <Stack gap={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6" fontWeight={700}>
            order {order.id}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" color="text.tertiary">
            Songs
          </Typography>
          <Typography mr={"10px"} variant="body1">
            {order.songsIds?.length || 0}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" color="text.tertiary">
            Albums
          </Typography>
          <Typography mr={"10px"} variant="body1">
            {order.albumIds?.length || 0}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" color="text.tertiary">
            Singers
          </Typography>
          <Typography mr={"10px"} variant="body1">
            {order.singerIds?.length || 0}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" color="text.tertiary">
            Price
          </Typography>
          <Typography mr={"10px"} variant="body1">
            {order.price || 0} $
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderCard;
