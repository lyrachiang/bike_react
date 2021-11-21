import { createAsyncThunk } from '@reduxjs/toolkit';

import Api from '../../../helpers/api';

const getMetroLine = async (request, thunkAPI) => {
  const { fields, sort } = request;

  const query = {
    $select: fields || '',
    $orderby: sort || '',
  };

  const response = await Api.get('/Rail/Metro/Line/TRTC', query)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw thunkAPI.rejectWithValue(err.response.data);
    });

  return response;
};

const getMetroStationByLine = async (request, thunkAPI) => {
  const { id, fields, sort } = request;
  
  let filter = [];

  if (id) {
    filter.push(`LineID eq '${id}'`);
  }

  const query = {
    $select: fields || '',
    $filter: filter.join(' and '),
    $orderby: sort || '',
  };

  const response = await Api.get('/Rail/Metro/StationOfLine/TRTC', query)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw thunkAPI.rejectWithValue(err.response.data);
    });

  return response;
};

const getMetroStation = async (request, thunkAPI) => {
  const { id, fields } = request;
  
  let filter = [];

  if (id) {
    filter.push(`StationID eq '${id}'`);
  }

  const query = {
    $select: fields || '',
    $filter: filter.join(' and '),
  };

  const response = await Api.get('/Rail/Metro/Station/TRTC', query)
    .then((res) => {
      if (id) {
        return res.data[0];
      }

      return res.data;
    })
    .catch((err) => {
      throw thunkAPI.rejectWithValue(err.response.data);
    });

  return response;
};

export const fetchMetroLine = createAsyncThunk(
  'metro/fetchMetroLine',
  getMetroLine
);

export const fetchMetroStationByLine = createAsyncThunk(
  'metro/fetchMetroStationByLine',
  getMetroStationByLine
);

export const fetchMetroStation = createAsyncThunk(
  'metro/fetchMetroStation',
  getMetroStation
);