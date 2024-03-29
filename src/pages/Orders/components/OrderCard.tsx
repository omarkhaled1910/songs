import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }: { order: any }) => {
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
            Users
          </Typography>
          <Typography mr={"10px"} variant="body1">
            25
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="body1" color="text.tertiary">
            Policies
          </Typography>
          <Typography mr={"10px"} variant="body1">
            10
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderCard;
