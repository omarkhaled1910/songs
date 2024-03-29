import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import OrderCard from "./components/OrderCard";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { resetForm } from "../../reducers/order";

const Orders = () => {
  const navigate = useNavigate();
  const { orders } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetForm());
  }, []);

  return (
    <Box p={5}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={3}
        mb={3}
      >
        <Typography textAlign={"center"} variant="h4">
          Orders
        </Typography>
        <Button onClick={() => navigate("/add")}>
          <Add />
          Add Order
        </Button>
      </Stack>

      <Paper
        sx={{
          padding: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(4, 1fr)",
            md: "repeat(2, 1fr)",
          },
          gap: 6,
        }}
      >
        {orders.map((order, i) => (
          <OrderCard key={i} order={{ id: order.orderId, ...order }} />
        ))}
      </Paper>
    </Box>
  );
};

export default Orders;
