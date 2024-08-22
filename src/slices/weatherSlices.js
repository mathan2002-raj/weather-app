import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api_key = '57bdda8d3ac8c6de0a17acc2416c36a8';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (countryName, thunkAPI) => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: countryName,
          units: 'metric',
          appid: api_key,
        },
      });

      const forecastResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          q: countryName,
          units: 'metric',
          appid: api_key,
        },
      });

      return {
        data: response.data,
        forecast: forecastResponse.data,
        timezone: response.data.timezone,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    loading: false,
    data: {},
    forecast: {},
    error: false,
    timezone: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.forecast = action.payload.forecast;
        state.timezone = action.payload.timezone;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default weatherSlice.reducer;
