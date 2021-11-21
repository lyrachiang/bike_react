import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../../helpers/api';

const getBikeStation = async (request, thunkAPI) => {
  const { position, fields } = request;
  const { lat, lon } = position;

  let spatialFilter = '';
  
  if (lat && lon) {
    spatialFilter = `nearby(${lat}, ${lon}, 500)`
  }

  const query = {
    $select: fields || '',
    $spatialFilter: spatialFilter || '',
  };

  const response = await Api.get('/Bike/Station/NearBy', query)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw thunkAPI.rejectWithValue(err.response.data);
    });

  return response;
};

const getBikeStationInfo = async (request, thunkAPI) => {
  const { position, fields } = request;
  const { lat, lon } = position;

  let spatialFilter = '';

  if (lat && lon) {
    spatialFilter = `nearby(${lat}, ${lon}, 500)`
  }

  const query = {
    $select: fields || '',
    $spatialFilter: spatialFilter || '',
  };

  const response = await Api.get('/Bike/Availability/NearBy', query)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw thunkAPI.rejectWithValue(err.response.data);
    });

  return response;
};

export const fetchBikeStation = createAsyncThunk(
  'bike/fetchBikeStation',
  getBikeStation
);

export const fetchBikeStationInfo = createAsyncThunk(
  'bike/fetchBikeStationInfo',
  getBikeStationInfo
);