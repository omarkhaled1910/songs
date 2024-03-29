import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reducers/order";
import ordersReducer from "./reducers/orders";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    orders: ordersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
