import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  id: null,
  firstName: null,
  lastName: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.id = action.payload.user;
    },
    logout(state) {
      state = initialState;
    },
  },
});
export const userActions = userSlice.actions;
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export default store;
