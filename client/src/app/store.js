import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/ProductSlice.js';
import authReducer from '../features/auth/authSlice.js';
import cartReducer from '../features/cart/cartSlice.js';
import orderReducer from '../features/order/orderSlice.js';
import userReducer from '../features/user/userSlice.js';


export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    order: orderReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
