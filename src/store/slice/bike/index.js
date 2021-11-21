import { createSlice } from '@reduxjs/toolkit';

import * as fetchActions from './actions';

export const {
  fetchBikeStation,
  fetchBikeStationInfo,
} = fetchActions;

const initialState = {
  isBikeStationLoading: false,
  isBikeStationInfoLoading: false,
  bikeStationList: [],
  bikeStationInfoList: [],
};

export const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    setBikeStationList: (state, action) => {
      state.bikeStationList = action.payload;
    },
    setBikeStationInfoList: (state, action) => {
      state.bikeStationInfoList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikeStation.pending, (state) => {
        state.isBikeStationLoading = true;
      })
      .addCase(fetchBikeStation.fulfilled, (state, action) => {
        state.isBikeStationLoading = false;
        state.bikeStationList = action.payload;
      })
      .addCase(fetchBikeStationInfo.pending, (state) => {
        state.isBikeStationInfoLoading = true;
      })
      .addCase(fetchBikeStationInfo.fulfilled, (state, action) => {
        state.isBikeStationInfoLoading = false;
        state.bikeStationInfoList = action.payload;
      })
  },
});

const { actions, reducer } = bikeSlice;

export const { setBikeStationList, setBikeStationInfoList } = actions;
export const getBikeState = (state) => state.bike;
export default reducer;