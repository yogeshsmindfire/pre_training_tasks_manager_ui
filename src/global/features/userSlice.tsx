import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null,
    isFetching: false,
    isInitialFetchDone: false,
};

export const userSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchUser: (state) => {
      state.isFetching = true;
      state.isInitialFetchDone = true;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isFetching = false
      state.isInitialFetchDone = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isFetching = false
      state.isInitialFetchDone = true;
    },
  },
});

export const { login, logout, fetchUser } = userSlice.actions;
export default userSlice.reducer;
