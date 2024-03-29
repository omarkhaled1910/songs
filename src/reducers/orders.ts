import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { dummyOrders } from "../utils";

const initialState: { orders: any[]; seletedOrder: any } = {
  orders: [...dummyOrders],
  seletedOrder: null,
};

export const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrderById: (state, action: PayloadAction<string>) => {
      state.seletedOrder = state.orders.find(
        (order) => order?.id === action.payload
      );
    },
    addOrder: (state, action: PayloadAction<any>) => {
      console.log({ ...action.payload, id: uuidv4() });
      state.orders = [...state.orders, { ...action.payload, id: uuidv4() }];
    },
    editOrder: (state, action: PayloadAction<any>) => {
      const newOrders = state.orders.map((order) =>
        order.id === action.payload.id ? { ...action.payload } : order
      );
      console.log(newOrders, action.payload);
      state.orders = newOrders;
    },
  },
});

export const { getOrderById, addOrder, editOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
