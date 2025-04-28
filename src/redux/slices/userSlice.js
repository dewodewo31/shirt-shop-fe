import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
    setLoggedInOut(state, action) {
      state.isLoggedIn = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setCurrentUser, setLoggedInOut, setToken } = userSlice.actions;
export default userSlice.reducer;
