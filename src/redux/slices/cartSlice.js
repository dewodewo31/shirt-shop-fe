import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Helper untuk simpan cart ke localStorage
const saveCartToLocalStorage = cartItems => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Kalau mau load cart saat app pertama kali buka
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
};

const initialState = {
  cartItems: loadCartFromLocalStorage(), // ambil dari localStorage kalau ada
  validCoupon: {
    name: "",
    discount: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      let productItem = state.cartItems.find(
        product =>
          product.product_id === item.product_id &&
          product.color.id === item.color.id &&
          product.size.id === item.size.id
      );
      if (productItem) {
        toast.info("Produk Sudah Ditambahkan Kedalam Keranjang");
      } else {
        state.cartItems = [item, ...state.cartItems];
        saveCartToLocalStorage(state.cartItems);
        toast.success("Produk Berhasil Ditambahkan Kedalam Keranjang");
      }
    },
    incrementQ(state, action) {
      const item = action.payload;
      let productItem = state.cartItems.find(
        product =>
          product.product_id === item.product_id &&
          product.color.id === item.color.id &&
          product.size.id === item.size.id
      );
      if (productItem) {
        if (productItem.qty === productItem.maxQty) {
          toast.warn(
            `Maksimal Hanya ${productItem.maxQty} Produk Yang Tersedia`
          );
        } else {
          productItem.qty += 1;
          saveCartToLocalStorage(state.cartItems);
        }
      }
    },
    decrementQ(state, action) {
      const item = action.payload;
      let productItem = state.cartItems.find(
        product =>
          product.product_id === item.product_id &&
          product.color.id === item.color.id &&
          product.size.id === item.size.id
      );
      if (productItem) {
        if (productItem.qty <= 1) {
          toast.warn("Pembelian Minimal Adalah 1");
        } else {
          productItem.qty -= 1;
          saveCartToLocalStorage(state.cartItems);
        }
      }
    },
    removeFromCart(state, action) {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        product =>
          !(
            product.product_id === item.product_id &&
            product.color.id === item.color.id &&
            product.size.id === item.size.id
          )
      );
      saveCartToLocalStorage(state.cartItems);
      toast.warning("Produk Berhasil Dihapus Dari Keranjang");
    },
    clearCartItems(state) {
      state.cartItems = [];
      saveCartToLocalStorage([]);
    },
    setValidCoupon(state, action) {
      state.validCoupon = action.payload;
    },
    addCouponIdToCartItem(state, action) {
      const coupon_id = action.payload;
      state.cartItems = state.cartItems.map(item => {
        return { ...item, coupon_id };
      });
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQ,
  decrementQ,
  removeFromCart,
  clearCartItems,
  setValidCoupon,
  addCouponIdToCartItem,
} = cartSlice.actions;

export default cartReducer;
