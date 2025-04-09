import { createSlice } from "@reduxjs/toolkit";

// 🔑 Get key for current user
const getUserKey = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user?.email || "guest";
};

// 📦 Load cart from localStorage for current user
const getCartFromStorage = () => {
  const key = getUserKey();
  return JSON.parse(localStorage.getItem(`cart_${key}`)) || {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  };
};

// 💾 Save cart to localStorage for current user
const saveCartToStorage = (cartItems, totalAmount, totalQuantity) => {
  const key = getUserKey();
  localStorage.setItem(
    `cart_${key}`,
    JSON.stringify({ items: cartItems, totalAmount, totalQuantity })
  );
};

const initialCart = getCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: initialCart.items,
    totalAmount: initialCart.totalAmount,
    totalQuantity: initialCart.totalQuantity,
  },
  reducers: {
    setCart(state, action) {
      const { items, totalAmount, totalQuantity } = action.payload;
      state.cartItems = items;
      state.totalAmount = totalAmount;
      state.totalQuantity = totalQuantity;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      saveCartToStorage(state.cartItems, state.totalAmount, state.totalQuantity);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (!existingItem) return;

      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      saveCartToStorage(state.cartItems, state.totalAmount, state.totalQuantity);
    },
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (!existingItem) return;

      state.totalQuantity -= existingItem.quantity;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      saveCartToStorage(state.cartItems, state.totalAmount, state.totalQuantity);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
