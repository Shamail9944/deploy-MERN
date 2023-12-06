import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchProductByUserId, updateCart, deleteCartItem, clearCart } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchProductByUserIdAsync = createAsyncThunk(
  'cart/cartItemsByUserId',
  async (userId) => {
    const response = await fetchProductByUserId(userId);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (updateitem) => {
    const response = await updateCart(updateitem);
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    return response.data;
  }
);
export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (userId) => {
    const response = await clearCart(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })

      .addCase(fetchProductByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })

      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload;
      })

      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload)
        state.items.splice(index, 1);
      })

      .addCase(clearCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      })
  },
});

export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
