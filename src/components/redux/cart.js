import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartDetail: [],
  },
  reducers: {
    setCartDetail: (state, action) => {
      state.cartDetail = action.payload;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartDetail.findIndex(item => item.productId === newItem.productId);
      if (existingItemIndex === -1) {
        state.cartDetail.push(newItem);
      }
    },
    removeItemFromCart: (state, action) => {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.cartDetail.length) {
        state.cartDetail.splice(indexToRemove, 1);
      }
    },
    updateItemInCart: (state, action) => {
      const { indexToUpdate, updatedItem } = action.payload;
      if (indexToUpdate >= 0 && indexToUpdate < state.cartDetail.length) {
        state.cartDetail[indexToUpdate] = updatedItem;
      }
    },
    incrementItemQuantity: (state, action) => {
      const indexToUpdate = action.payload;
      if (indexToUpdate >= 0 && indexToUpdate < state.cartDetail.length) {
        if (state.cartDetail[indexToUpdate].productQuantity < state.cartDetail[indexToUpdate].maxProduct) {
          state.cartDetail[indexToUpdate].productQuantity += 1;
        }
      }
    },
    decrementItemQuantity: (state, action) => {
      const indexToUpdate = action.payload;
      if (indexToUpdate >= 0 && indexToUpdate < state.cartDetail.length) {
        const newQuantity = state.cartDetail[indexToUpdate].productQuantity - 1;
        state.cartDetail[indexToUpdate].productQuantity = Math.max(1, newQuantity);
      }
    },
    itemsClear: (state, action) => {
      state.cartDetail = []
    },
  },
});

export const { setCartDetail, addItemToCart, itemsClear,removeItemFromCart, updateItemInCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
