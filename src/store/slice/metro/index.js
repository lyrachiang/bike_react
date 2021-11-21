import { createSlice } from '@reduxjs/toolkit';

import * as fetchActions from './actions';

export const {
  fetchMetroLine,
  fetchMetroStationByLine,
  fetchMetroStation,
} = fetchActions;

const initialState = {
  isMetroLoading: false,
  metroLineList: [],
  metroStationList: [],
  metroStationInfo: {},
};

export const metroSlice = createSlice({
  name: 'metro',
  initialState,
  reducers: {
    setMetroLineList: (state, action) => {
      state.metroLineList = action.payload;
    },
    setMetroStationList: (state, action) => {
      state.metroStationList = action.payload;
    },
    setMetroStationInfo: (state, action) => {
      state.metroStationInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetroLine.pending, (state) => {
        state.isMetroLoading = true;
      })
      .addCase(fetchMetroLine.fulfilled, (state, action) => {
        state.isMetroLoading = false;
        state.metroLineList = action.payload;
      })
      .addCase(fetchMetroStationByLine.pending, (state) => {
        state.isMetroLoading = true;
      })
      .addCase(fetchMetroStationByLine.fulfilled, (state, action) => {
        state.isMetroLoading = false;
        state.metroStationList = action.payload;
      })
      .addCase(fetchMetroStation.pending, (state) => {
        state.isMetroLoading = true;
      })
      .addCase(fetchMetroStation.fulfilled, (state, action) => {
        state.isMetroLoading = false;
        state.metroStationInfo = action.payload;
      });
  },
});

const { actions, reducer } = metroSlice;

export const { setMetroLineList, setMetroStationList, setMetroStationInfo } = actions;
export const getMetroState = (state) => state.metro;
export default reducer;