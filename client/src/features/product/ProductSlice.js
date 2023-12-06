import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductByFilter, fetchCategories, fetchBrands, fetchProductById, createProduct, updateProduct } from './ProductAPI';

const initialState = {
  selectedProduct: null,
  status: 'idle',
  totalItems: 0,
  products: [],
  categories: [],
  brands: [],
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchProductByFilterAsync = createAsyncThunk(
  'product/fetchProductByFilter',
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductByFilter(filter, sort, pagination);
    return response.data;
  }
);

export const fetchProductCategoriesAsync = createAsyncThunk(
  'product/fetchProductCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchProductBrandsAsync = createAsyncThunk(
  'product/fetchProductBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })

      .addCase(fetchProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })


      .addCase(fetchProductCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchProductCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchProductBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })

      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product.id === action.payload.id)
        state.products[index] = action.payload;
      })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectedProductDetail = (state) => state.product.selectedProduct;

export const {clearSelectedProduct} =productSlice.actions

export default productSlice.reducer;
