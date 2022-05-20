import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userAuthInfo: { name: "", userId: "", token: "" },
    userPath: {
      mean: "",
      path: [],
      prediction: "",
    },
    careerLibraryData: {},
  },
  reducers: {
    login(state, action) {
      state.userAuthInfo.token = action.payload.userAuthInfo.token;
      state.userAuthInfo.name = action.payload.userAuthInfo.name;
      state.userAuthInfo.userId = action.payload.userAuthInfo.userId;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      localStorage.removeItem("expiryDate");
      state.userAuthInfo.token = "";
      state.userAuthInfo.name = "";
      state.userAuthInfo.userId = "";
      state.userPath.mean = "";
      state.userPath.path = [];
      state.userPath.prediction = "";
    },
    addPathway(state, action) {
      state.userPath.mean = action.payload.mean;
      state.userPath.path = action.payload.path;
      state.userPath.prediction = action.payload.prediction;
    },
    addCareerLibraryData(state, action) {
      state.careerLibraryData = action.payload.careerLibraryData;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
