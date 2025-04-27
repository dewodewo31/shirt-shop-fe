import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
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
      console.log("ITEM:", item);
      console.log("CART:", state.cartItems);
      let productItem = state.cartItems.find(
        product =>
          product.product_id === item.product_id &&
          product.color.id === item.color.id &&
          product.size.id === item.size.id
      );
      if (productItem) {
        toast.info("Produk Sudah Ditambahkan Kedalam Keranjang ");
      } else {
        state.cartItems = [item, ...state.cartItems];
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
      toast.warning("Product removed from your cart");
    },
  },
  setValidCoupon(state, action) {
    state.validCoupon = action.payload;
  },
  addCouponIdToCartItem(state, action) {
    const coupon_id = action.payload;
    state.cartItems = state.cartItems.map(item => {
      return { ...item, coupon_id };
    });
  },
  clearCartItems(state, action) {
    state.cartItems = [];
  },
});

const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQ,
  decrementQ,
  removeFromCart,
  setValidCoupon,
  addCouponIdToCartItem,
  clearCartItems,
} = cartSlice.actions;

export default cartReducer;
