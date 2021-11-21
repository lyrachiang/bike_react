import { configureStore } from '@reduxjs/toolkit';
import metroReducer from './slice/metro';
import bikeReducer from './slice/bike';

export const store = configureStore({
  reducer: {
    metro: metroReducer,
    bike: bikeReducer,
  },
});
