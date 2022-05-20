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
      jobsAvailable: [],
    },
    careerLibraryData: {},
    searchCareerLibraryData: [],
    searchResults: [],
    filterText: "",
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
      state.userPath.prediction = action.payload.prediction;
      state.userPath.jobsAvailable = action.payload.jobsAvailable;
    },
    addCareerLibraryData(state, action) {
      state.careerLibraryData = action.payload.careerLibraryData;
      const careerLibraryData = { ...state.careerLibraryData };
      Object.keys(careerLibraryData).forEach((domain) => {
        state.searchCareerLibraryData = [
          ...state.searchCareerLibraryData,
          ...careerLibraryData[domain].subDomains.map((subDomain) => {
            subDomain.domainName = domain;
            return subDomain;
          }),
        ];
      });
    },
    search(state, action) {
      state.filterText = action.payload;
      state.searchResults = state.searchCareerLibraryData.filter(
        (career) =>
          career.name?.toLowerCase().includes(state.filterText.toLowerCase()) ||
          career.domainName
            ?.toLowerCase()
            .includes(state.filterText.toLowerCase())
      );
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
