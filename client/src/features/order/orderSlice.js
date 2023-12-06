import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchAllOrders, addOrder, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0,
};

export const addOrderAsync = createAsyncThunk(
  'orders/addOrder',
  async (order) => {
    const response = await addOrder(order);
    return response.data;
  }
);
export const FetchAllOrdersAsync = createAsyncThunk(
  'orders/FetchAllOrders',
  async (pagination) => {
    const response = await FetchAllOrders(pagination);
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  'orders/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(FetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index] = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
