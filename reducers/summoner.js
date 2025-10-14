import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSummoner: {
    username: "",
    tagline: "",
    puuid: "",
    profileIconId: null,
    summonerLevel: null,
  },
  loading: false,
  error: null,
};

export const summonerSlice = createSlice({
  name: "summoner",
  initialState,
  reducers: {
    addSummoner: (state, action) => {
      state.currentSummoner = action.payload;
    },
    fetchSummonerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSummonerSuccess: (state, action) => {
      state.currentSummoner = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchSummonerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSummoner: (state) => {
      state.currentSummoner = initialState.currentSummoner;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  addSummoner,
  fetchSummonerStart,
  fetchSummonerSuccess,
  fetchSummonerFailure,
  clearSummoner,
} = summonerSlice.actions;

export default summonerSlice.reducer;
